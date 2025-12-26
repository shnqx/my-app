import { ProductCard } from "./product-card";

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductGroupList: React.FC<Props> = ({
    title,
    items,
    categoryId,
    className,
    listClassName
}) => {

    return (
        <>
            <h1 className="text-primary text-5xl font-extrabold">{title}</h1>
            <div className="grid grid-cols-3">
                {items.map((product, i) => {
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                        />
                    )
                })}
            </div>

        </>
    )
}
