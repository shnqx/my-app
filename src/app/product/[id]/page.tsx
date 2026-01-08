"use client";

import { Container } from "../../../components/shared/container";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from "lucide-react";
import { supabase } from '@/lib/supabase';

export default function ProductModalPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } 
        }
        if (id) fetchProduct();
    }, [id]);

    const addToCart = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;

        if (!token) {
            router.push('/login');
            return;
        }

        const response = await fetch(`/api/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ product, quantity }),
        });

        if (response.ok) {
            router.back();
        } else {
            console.error('Cart error');
        }
    };

    if (!product) return <Container>Товар не найден</Container>;

    return (
        <Container className="flex flex-col mt-10 lg:mx-80">
            <div className="lg:flex gap-10">
                <div className="flex flex-col justify-between mb-5 lg:mt-10">
                    <Image
                        width={300}
                        height={300}
                        src={product.image_url}
                        alt={product.name}
                        className="rounded-lg object-cover"
                    />
                    <h1 className="text-center text-primary lg:text-2xl font-bold mt-4">
                        {product.price * quantity} руб
                    </h1>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h1 className="text-primary font-bold lg:text-4xl mb-5">{product.name}</h1>
                        <h1 className="text-primary text-sm">{product.description}</h1>
                    </div>
                    <div className="border-t border-popover flex justify-between items-center pt-5">
                        <div className="border border-primary rounded-full h-16 w-40 flex justify-around items-center">
                            {quantity >= 2 ? <Button onClick={() => setQuantity(quantity - 1)} className="rounded-full" size="icon">
                                <MinusIcon />
                            </Button> : <Button className="rounded-full" variant="link" size="icon">
                                <MinusIcon />
                            </Button>}
                            <span>{quantity}</span>
                            <Button onClick={() => setQuantity(quantity + 1)} className="rounded-full" size="icon">
                                <PlusIcon />
                            </Button>
                        </div>
                        <Button onClick={addToCart} size="lg" className="h-16 px-10">Заказать</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
