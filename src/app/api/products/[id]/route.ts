import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Типизируем как Promise
) {
    // Ожидаем параметры (обязательно для Next.js 15)
    const { id } = await params;

    const { data, error } = await supabase
        .from('products')
        .select(`
            id,
            name,
            price,
            image_url,
            description,
            category (id, name)
        `)
        .eq('id', id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(data);
}
