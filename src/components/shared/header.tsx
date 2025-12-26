"use client"
import { cn } from "../../lib/utils"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { IconUserFilled, IconShoppingBag, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Container } from "./container"

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);


    return (
        <header className={cn('sticky top-0 z-50 border-b bg-secondary border-gray-100', className)}>
            <Container className="flex items-center justify-between py-4">
                <div>
                    <h1 className="text-2xl uppercase text-primary font-black">Burgers</h1>
                    <p className="text-sm text-gray-400 leading-3">Просто вкусно</p>
                </div>
                <div className="flex items-center gap-3">
                    {isEditing ? <Input ref={inputRef} onBlur={() => setIsEditing(false)} placeholder="Поиск по меню" className="bg-card rounded-full h-12"></Input> : <Button onClick={() => setIsEditing(true)} variant="ghost" size="icon-lg" className="rounded-full"><IconSearch /></Button>}
                    <Button className="font-bold" variant="outline">
                        <IconUserFilled /> Войти
                    </Button>
                    <Button>
                        <IconShoppingBag />
                    </Button>
                </div>
            </Container>
        </header>
    )
}