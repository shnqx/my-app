import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
// import { Category } from '@prisma/client';

interface Props {
  className?: string;
}

export const StickyBar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('sticky top-30', className)}>
      {/* <Container className="flex items-center justify-between ">
      </Container> */}
      <Categories />
    </div>
  );
};
