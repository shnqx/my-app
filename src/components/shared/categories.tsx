import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BurgerPicture from "@/images/7fee4e3349f0963b9fc1abd6c2a21fdc.webp"
import PotatoPicture from "@/images/34f2fd42740d4fcc43ddf8c2384c840d.webp"
import NaggetsPicture from "@/images/c7201cca2746f60aa1b3322b82373f63.webp"
import DrinkPicture from "@/images/a623588d4fb7a258aa8014a3972ade39.webp"

interface Props {
  className?: string;
}

const cats = [
  {
    name: "Бургеры",
    pic: BurgerPicture.src
  },
  {
    name: "Картошка",
    pic: PotatoPicture.src
  },
  {
    name: "Наггетсы",
    pic: NaggetsPicture.src
  },
  {
    name: "Напитки",
    pic: DrinkPicture.src
  }
]



const activeIndex: number = 0;

export const Categories: React.FC<Props> = ({ className }) => {

  return (
    <div className={cn('inline-flex flex-col bg-secondary rounded-2xl', className)}>
      {cats.map((cat, i) => (
        <Link
          key={cat.name}
          className={cn(
            'flex border-b text-primary items-center font-bold h-15 rounded-t-2xl px-18',
            activeIndex === i && 'bg-card text-primary',
          )}
          href="">
          <div className="flex gap-3 items-center">
            <Avatar className="">
              <AvatarImage src={cat.pic} />
            </Avatar>
            {cat.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
