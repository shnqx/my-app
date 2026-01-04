'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '../../../lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from "lucide-react"
import { supabase } from '@/lib/supabase'

interface Props {
  product: any;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

const addToCart = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  if (!token) {
    router.push('/login')
    return
  }

    const response = await fetch(`/api/cart/${product.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product, quantity }),
  })

  if (!response.ok) {
    console.error('Cart error', await response.text())
    return
  }

  const result = await response.json()
  router.back()
}

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'lg:w-[1000px] lg:max-w-[1000px] lg:min-h-[500px] rounded-2xl bg-background pt-10 pr-10',
          className,
        )}>
        <div className="lg:flex">
          <div className="flex flex-col justify-between mb-5 lg:mt-10">
            <Image
              width={700}
              height={700}
              src={product?.image_url}
              alt={product?.name || 'product image'}
            />
            <DialogTitle className="text-center text-primary lg:text-2xl font-bold">{product?.price * quantity + " " + "руб"}</DialogTitle>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <DialogTitle className="text-primary font-bold lg:text-4xl mb-5">{product?.name}</DialogTitle>
              <DialogTitle className="text-primary text-sm">{product?.description}</DialogTitle>
            </div>
            <div className="border-t border-popover flex justify-between">
              <div className="border border-primary mt-5 rounded-full h-16 w-34 lg:h-17 lg:w-37 flex justify-around items-center">
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
              <Button onClick={() => addToCart()} size="lg" className="h-16 mt-5">Заказать</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
