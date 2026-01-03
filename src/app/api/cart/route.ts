import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const { data, error } = await supabase
      .from('cart')
      .select(`
        id,
        product_id,
        user_id,
        quantity,
        products (
          id,
          name,
          price,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Ошибка Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Некорректный формат тела запроса" }, { status: 400 });
  }
}
