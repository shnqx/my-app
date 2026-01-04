import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const authHeader = request.headers.get('authorization') ?? ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
      return NextResponse.json({ error: 'Missing auth token' }, { status: 401 })
    }

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !userData?.user) {
      return NextResponse.json({ error: userError?.message ?? 'Invalid token' }, { status: 401 })
    }
    
    const userId = userData.user.id
    const productId = body.product.id
    const quantityToAdd = body.quantity || 1

    const { data: existingItem, error: fetchError } = await supabaseAdmin
      .from('cart')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { 
      throw fetchError
    }

    let result;

    if (existingItem) {
      result = await supabaseAdmin
        .from('cart')
        .update({ quantity: existingItem.quantity + quantityToAdd })
        .eq('id', existingItem.id)
        .select()
    } else {

      result = await supabaseAdmin
        .from('cart')
        .insert({ 
          product_id: productId, 
          quantity: quantityToAdd, 
          user_id: userId 
        })
        .select()
    }

    if (result.error) throw result.error

    return NextResponse.json({ data: result.data }, { status: 200 })

  } catch (error: any) {
    console.error('Cart operation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
