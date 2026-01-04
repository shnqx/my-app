'use client'
import { ProductCard } from "./product-card";
import { useRef, useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useCategoryStore } from "@/store/category";
import { cn } from "@/lib/utils";

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
        <div className={cn("lg:scroll-mt-20 scroll-mt-35", className)} ref={ref} id={title}>
            <h1 className="text-primary mb-5 mt-6 ml-5 text-5xl font-extrabold">{title}</h1>
            <div
                className="grid grid-cols-2 mt-6 ml-5 lg:grid-cols-3"
            >
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
