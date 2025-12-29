'use client';

import { Dialog, DialogContent, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '../../../lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from "lucide-react"


interface Props {
  product: any;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'w-[1000px] max-w-[1000px] min-h-[500px] rounded-2xl bg-background p-10',
          className,
        )}>
        <div className="flex">
          <div className="flex flex-col justify-between mt-10">
            <Image
              width={700}
              height={700}
              src={product?.imageUrl}
              alt={product?.name || 'product image'}
            />
            <DialogTitle className="text-center text-primary text-2xl font-bold">{product?.price + " " + "руб"}</DialogTitle>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <DialogTitle className="text-primary font-bold text-4xl mb-5">{product?.name}</DialogTitle>
              <DialogTitle className="text-primary text-sm">{product?.description}</DialogTitle>
            </div>
            <div className="border-t border-popover flex justify-between">
              <div className="border border-primary mt-5 rounded-full h-17 w-37 flex justify-around items-center">
                <Button className="rounded-full" size="icon">
                  <MinusIcon />
                </Button>
                <Button className="rounded-full" size="icon">
                  <PlusIcon />
                </Button>
              </div>
              <Button className="mt-7">Заказать</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
