'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartDrawerItem } from './cart-drawer-item';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { supabase } from '@/lib/supabase';

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '../ui/sheet';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [open, setOpen] = useState(false); 
    const [totalAmount, setTotalAmount] = useState(0);
    const router = useRouter();

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
        if (open && userId) {
            getCart();
        }
    }, [open, userId]);

    useEffect(() => {
         const total = cartItems.reduce((acc, item) => {
            const price = item.products?.price || 0;
            return acc + (item.quantity * price);
         }, 0);
         setTotalAmount(total);
    }, [cartItems]);

    const handleOpenCheckout = () => {
        setOpen(false);
        router.push('/checkout');
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col !p-0 !gap-0">
                <SheetHeader className="flex flex-col mt-10 px-4">
                    <SheetTitle className="font-extrabold text-3xl text-primary">
                        Корзина
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 w-full overflow-hidden">
                    <div className="px-4">
                        <div className="flex flex-col gap-6 py-6">
                            {userId && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <CartDrawerItem 
                                        key={item.id} 
                                        item={item} 
                                        onQuantityChange={getCart} 
                                        onDelete={getCart} 
                                    />
                                ))
                            ) : (
                                <p className="text-center text-primary py-10">Корзина пуста</p>
                            )}
                        </div>
                    </div>
                </ScrollArea>

                <SheetFooter className="flex-shrink-0">
                    <div className="border-t border-popover p-4">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-input font-bold text-4xl">{totalAmount} ₽</SheetTitle>
                            <Button
                                onClick={() => handleOpenCheckout()}
                                size="xl"
                                className="bg-ring hover:bg-ring/80 text-white"
                                disabled={cartItems.length === 0}
                            >
                                Далее
                            </Button>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
