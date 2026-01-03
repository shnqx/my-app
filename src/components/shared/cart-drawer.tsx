'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
import { get } from 'http';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [open, setOpen] = useState(false); 
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserId(user.id);
        };
        fetchUserId();
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
         setTotalAmount(cartItems.reduce((total, item) => total + item.quantity * item.products.price, 0))
    }, [cartItems]);

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
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <CartDrawerItem key={item.id} item={item} onQuantityChange={() => getCart()} onDelete={() => getCart()} />
                                ))
                            ) : (
                                <p className="text-center text-primary py-10">Корзина пуста</p>
                            )}
                        </div>
                    </div>
                </ScrollArea>

                <SheetFooter className="flex-shrink-0">
                    <div className="border-t border-popover ">
                        <div className="flex mt-5 items-center justify-between">
                            <SheetTitle className="text-input font-bold text-4xl">{totalAmount} ₽</SheetTitle>
                            <Button
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




