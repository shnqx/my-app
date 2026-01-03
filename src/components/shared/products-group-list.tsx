'use client'
import { ProductCard } from "./product-card";
import { useRef, useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useCategoryStore } from "@/store/category";

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

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        // root: containerRef.current,
        threshold: 0.8,
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, entry?.isIntersecting, title])

    return (
        <div className={className} ref={ref} id={title}>
            <h1 className="text-primary mb-5 text-5xl font-extrabold">{title}</h1>
            <div className="grid grid-cols-3">
                {items.map((product, i) => {
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.image_url}
                        />
                    )
                })}
            </div>
        </div>
    )
}
