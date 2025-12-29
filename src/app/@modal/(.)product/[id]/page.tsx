import { Container } from "../../../../components/shared/container"
import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import { supabase } from "@/lib/supabase";
// import  ProductForm from
// import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  async function getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
      id,
      name,
      price,
      categoryId,
      imageUrl,
      description,
      category (
      id,
      name)
    `)
      .eq('id', Number(id));

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data;
  }

  const products = await getProducts()

  return (
    <Container className="flex flex-col my-10">
      <ChooseProductModal product={products[0]} />
    </Container>
  );
}
