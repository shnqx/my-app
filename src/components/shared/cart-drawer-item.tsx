'use client'

import React from 'react';
import { useState } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Title } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { MinusIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { CircleX } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ className }) => {

  const [quantity, setQuantity] = useState<number>(1)

  return (
    <div className="flex border-b border-popover gap-4 p-4">
      <div>
        <Image
          height={100}
          width={100}
          alt={'фото товара'}
          src={'https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/group/8e1dc6f49e08b52993d716f59c75a4a9.png'} />
      </div>
      <div className="justify-between flex flex-col flex-1 ">
        <Title className="font-bold text-primary text-xl">Мега сырный</Title>
        <Title className="text-lg text-input">100р</Title>
      </div>
      <div className="justify-between flex flex-col items-end">
        <Button size="icon-sm" className="bg-backgroud hover:bg-background text-primary">
          <CircleX />
        </Button>
        <div className="border border-primary rounded-full flex h-8 px-3 gap-1.5 justify-center items-center">
          {quantity >= 2 ? <Button onClick={() => setQuantity(quantity - 1)} className="rounded-full" size="icon-sm">
            <MinusIcon />
          </Button> : <Button className="rounded-full" variant="link" size="icon-sm">
            <MinusIcon />
          </Button>}
          <span>{quantity}</span>
          <Button onClick={() => setQuantity(quantity + 1)} className="rounded-full" size="icon-sm">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
