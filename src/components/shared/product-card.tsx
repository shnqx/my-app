import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {

    return (
        <div className={cn("bg-secondary mb-5 mr-5 text-primary rounded-lg", className)}>
            <Link href={`/product/${id}`}>
                <div className="p-6 justify-center">
                    <div>
                        <img alt={name} src={imageUrl} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">{name}</h1>
                        <div className="mt-4 flex justify-between">
                            <p className="mt-5 font-bold">{price + "р"}</p>
                            <Button variant="destructive">Заказать</Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}