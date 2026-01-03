import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const cartItemId = body.cartItemId;

        if (!cartItemId) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('id', cartItemId);

        if (error) {
            console.error('Ошибка Supabase:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: "Некорректный формат тела запроса" }, { status: 400 });
    }
}
