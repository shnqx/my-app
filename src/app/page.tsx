'use client'

import { ProductGroupList } from "@/components/shared/products-group-list";
import { Container } from "@/components/shared/container"
import { Categories } from "@/components/shared/categories";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const burgers = products.data?.filter((p: any) => p.category_id === 1) || [];
  const potato = products.data?.filter((p: any) => p.category_id === 2) || [];
  const naggets = products.data?.filter((p: any) => p.category_id === 3) || [];
  const drinks = products.data?.filter((p: any) => p.category_id === 4) || [];

  return (
    <>
      <Container className="mt-10 pb-14">
        <div className="lg:flex items-start gap-[80px]">
          <div className="sticky lg:top-30 top-20">
            <ScrollArea className="">
              <Categories />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="flex-1">
            {products.data && <div className="flex flex-col gap-10">
              <ProductGroupList title="Бургеры" items={burgers} categoryId={1} />
              <ProductGroupList title="Картошка" items={potato} categoryId={2} />
              <ProductGroupList title="Наггетсы" items={naggets} categoryId={3} />
              <ProductGroupList title="Напитки" items={drinks} categoryId={4} />
            </div>
            }
          </div>
        </div>
      </Container>
    </>
  )
}
