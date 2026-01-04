// 'use client'

import { Container } from "../../../../components/shared/container"
import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
// import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase'

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  async function getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
      id,
      name,
      price,
      category_id,
      image_url,
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

  const products = await getProducts();

  return (
    <Container className="flex flex-col my-10">
      <ChooseProductModal product={products[0]} />
    </Container>
  );
}
