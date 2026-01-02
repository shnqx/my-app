'use client';

import React from 'react';
import { CartDrawerItem } from './cart-drawer-item';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '../ui/sheet';

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col !p-0 !gap-0">
                <SheetHeader className="flex flex-col mt-10 px-4">
                    <SheetTitle className="font-extrabold text-3xl text-primary">
                        Корзина
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1 w-full overflow-hidden">
                    <div className="px-4">
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                        <CartDrawerItem />
                    </div>
                </ScrollArea>
                <SheetFooter className="flex-shrink-0">
                    <div className="border-t border-popover ">
                        <div className="flex mt-5 items-center justify-between">
                            <SheetTitle className="text-input font-bold text-4xl">100</SheetTitle>
                            <Button size="xl" className="bg-ring hover:bg-ring/80 text-white">Далее</Button>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
};
