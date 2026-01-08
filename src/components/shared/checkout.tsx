import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

interface Props {
    className?: string;
}

export const Checkout: React.FC<Props> = ({ className }) => {

    const [userId, setUserId] = useState<string | null>(null);
    const [cartItems, setCartItems] = React.useState<any[]>([]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentId = session?.user?.id || null;
            setUserId(currentId);
            if (!currentId) {
                setCartItems([]);
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserId(session?.user?.id || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const getCart = async () => {
        if (!userId) return;

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            const result = await response.json();
            setCartItems(result.data || []);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            getCart();
        }
    }, [userId]);

    return (
        <div className={cn("flex gap-8 m-10", className)}>
            <div className="flex flex-col w-full">
                <h1 className="text-primary font-bold text-5xl">Оформление заказа</h1>
                <div className="bg-secondary rounded-lg p-8 mt-8 w-full">
                <p className="text-primary font-bold text-2xl">Введите адрес доставки</p>
                <Input placeholder="Адрес доставки" className="mt-4 w-96" />
                </div>
            </div>
            <div className="bg-secondary rounded-lg p-8 mt-8 w-full">
                <h1 className="text-primary text-2xl font-bold">Состав заказа</h1>
                <div className="flex flex-col gap-4 mt-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <div>
                                <p className="font-medium">{item.products?.name}</p>
                                <p className="text-sm text-muted-foreground">{item.quantity} шт.</p>
                            </div>
                            <span className="flex-grow mx-2 border-b-2 border-muted-foreground border-dotted border-gray-400 relative -top-1"></span>
                            <p className="font-medium">{item.quantity * (item.products?.price || 0)} ₽</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-muted mt-6 pt-6 flex items-center justify-between">
                    <h2 className="text-primary font-bold text-2xl">Итого:</h2>
                    <p className="text-primary font-bold text-2xl">
                        {cartItems.reduce((acc, item) => {
                            const price = item.products?.price || 0;
                            return acc + (item.quantity * price);
                        }, 0)} ₽
                    </p>
                </div>
            </div>
        </div>
    )
}