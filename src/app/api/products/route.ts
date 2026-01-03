import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

  const body = await request.json();

  const { data, error } = await supabase
    .from('products')
    .select(
      `
    id,
    name,
    price,
    category_id,
    image_url,
    description,
    category (
      id,
      name
    )
  `
    )
    .eq('id', Number(body.id))

  if (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
    id,
    name,
    price,
    category_id,
    image_url,
    description,
    category (
      id,
      name
    )
  `
    )

  if (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}
