import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'

// const products = [
//   { id: '1', name: 'iPhone 15 Pro', price: 99900 },
//   { id: '2', name: 'Samsung Galaxy S24', price: 85000 },
//   { id: '3', name: 'MacBook Air M3', price: 120000 },
//   { id: '4', name: 'AirPods Pro 2', price: 22000 },
// ];

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search')?.toLowerCase() || '';

    if (!query) {
        return NextResponse.json([]);
    }

    const filteredProducts = data?.filter((product) =>
        product.name.toLowerCase().includes(query)
    );

    // Имитация задержки сети для проверки лоадера
    // await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(filteredProducts);
}
