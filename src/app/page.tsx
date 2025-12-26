import { Categories } from "@/components/shared/categories"
import { ProductCard } from "@/components/shared/product-card"
import { ProductGroupList } from "@/components/shared/products-group-list"
import { Container } from "@/components/shared/container"
import { StickyBar } from "@/components/shared/sticky-bar"
import { supabase } from "@/lib/supabase";

async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
    id,
    name,
    price,
    categoryId,
    imageUrl,
    category (
    id,
    name)
  `)

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export default async function Home() {

  const products = await getProducts()

  const burgers = products.filter((p) => p.categoryId === 1);
  const potato = products.filter((p) => p.categoryId === 2);
  const naggets = products.filter((p) => p.categoryId === 3);
  const drinks = products.filter((p) => p.categoryId === 4);

  return (
    <>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            {/* <Categories /> */}
            <StickyBar />
          </div>

          <div className="flex-1">
            {products[0] && 
            <div className="flex flex-col gap-10"> 
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
