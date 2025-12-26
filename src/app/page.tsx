import { Categories } from "@/components/shared/categories"
import { ProductCard } from "@/components/shared/product-card"
import { ProductGroupList } from "@/components/shared/products-group-list"
import { Container } from "@/components/shared/container"
import { StickyBar } from "@/components/shared/sticky-bar"

export default function Home() {
  return (
    <>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
              {/* <Categories /> */}
              <StickyBar/>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-10">
              <ProductGroupList title="Бургеры" items={[
                {
                  id: 1,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 2,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 3,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 4,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 5,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 6,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
              ]} categoryId={1} />
              <ProductGroupList title="Картошка" items={[
                {
                  id: 7,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 8,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 9,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
                {
                  id: 10,
                  name: "Мега Сырный",
                  imageUrl: "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/dishes/d27134ee1b64edfc9f6f4274268cb7dd.png",
                  price: 100
                },
              ]} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>


    </>
  )
}
