import { Container } from "../../../components/shared/container"
// import  ProductForm from
// import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    
    return (
        <></>
    );
}
