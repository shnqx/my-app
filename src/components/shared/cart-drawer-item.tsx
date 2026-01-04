'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Title } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { MinusIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { CircleX } from 'lucide-react';

interface Props {
  item: any;
  onQuantityChange: () => void;
  onDelete: (id: string) => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ item, onDelete, onQuantityChange, className }) => {

  const [quantity, setQuantity] = useState<number>(item.quantity);

  const deleteCartItem = async () => {
    try {
      const response = await fetch('/api/cart/delete-cart-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId: item.id }),
      });
      const result = await response.json();
      if (response.ok) {
        onDelete(item.id); // Вызываем функцию родителя
      }
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
    }
  }

  const plusQuantity = () => setQuantity(prev => prev + 1);
  const minusQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const updateQuantityInDb = async (newQuantity: number) => {
    try {
      const response = await fetch('/api/cart/change-quantity-cart-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity, cartItemId: item.id }),
      });

      if (response.ok) {
        onQuantityChange();
      }
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error);
    }
  };

  useEffect(() => {
    if (quantity === item.quantity) return;
    const handler = setTimeout(() => {
      updateQuantityInDb(quantity);
    }, 500);

    return () => clearTimeout(handler);
  }, [quantity]);

  return (
    <div className="flex border-b border-popover gap-4 p-4">
      <div>
        <Image
          className="w-[50px] h-[35px] lg:w-[100px] lg:h-[70px]"
          height={100}
          width={100}
          alt={item.products.name || 'фото товара'}
          src={item.products.image_url} />
      </div>
      <div className="justify-between flex flex-col gap-5 flex-1 ">
        <Title className="font-bold text-primary text-xl">{item.products.name}</Title>
        <Title className="text-lg text-input">{item.products.price}</Title>
      </div>
      <div className="justify-between flex flex-col items-end">
        <Button onClick={deleteCartItem} size="icon-sm" className="bg-backgroud hover:bg-background text-primary">
          <CircleX />
        </Button>
        <div className="border border-primary rounded-full flex h-8 px-3 gap-1.5 justify-center items-center">
          {quantity > 1 ? <Button onClick={() => minusQuantity()} className="rounded-full" size="icon-sm">
            <MinusIcon />
          </Button> : <Button className="rounded-full" variant="link" size="icon-sm">
            <MinusIcon />
          </Button>}
          <span>{quantity}</span>
          <Button onClick={() => plusQuantity()} className="rounded-full" size="icon-sm">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
