import { cn } from "../../lib/utils"
import React from "react"
import { IconUserFilled, IconShoppingBag, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border-b border-gray-100', className)}>
            <Container className="flex items-center justify-between py-4">
                <div>
                    <h1 className="text-2xl uppercase text-primary font-black">Burgers</h1>
                    <p className="text-sm text-gray-400 leading-3">Просто вкусно</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon-lg" className="rounded-full">
                        <IconSearch />
                    </Button>
                    <Button variant="outline">
                        <IconUserFilled /> Войти
                    </Button>
                    <Button >
                        <IconShoppingBag />
                    </Button>
                </div>
            </Container>
        </header>
    )
}