"use client"

import { cn } from "../../lib/utils"
import React, { useState, useEffect, useRef } from "react"
import { IconUserFilled, IconShoppingBag, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Container } from "./container"
import { CartDrawer } from "./cart-drawer"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase" // Используем ваш готовый клиент

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Проверяем текущую сессию при загрузке
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        // 2. Подписываемся на изменения (вход/выход)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            router.refresh(); // Обновляем серверные данные при смене статуса
        });

        return () => subscription.unsubscribe();
    }, [router]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        ////////////////????????????????
    }

    return (
        <header className={cn('sticky top-0 z-50 border-b bg-secondary border-gray-100', className)}>
            <Container className="flex items-center justify-between py-4">
                <div>
                    <h1 className="text-2xl uppercase text-primary font-black">Burgers</h1>
                    <p className="text-sm text-gray-400 leading-3">Просто вкусно</p>
                </div>
                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <Input 
                            ref={inputRef} 
                            onBlur={() => setIsEditing(false)} 
                            placeholder="Поиск по меню" 
                            className="bg-card rounded-full h-12"
                        />
                    ) : (
                        <Button onClick={() => setIsEditing(true)} variant="ghost" size="icon-lg" className="rounded-full">
                            <IconSearch />
                        </Button>
                    )}
                    {user ? (
                        <Button onClick={handleSignOut} className="font-bold" variant="outline">
                            <IconUserFilled size={20} className="mr-2" /> Выйти
                        </Button>
                    ) : (
                        <Button onClick={() => router.push("/login")} className="font-bold" variant="outline">
                            <IconUserFilled size={20} className="mr-2" /> Войти
                        </Button>
                    )}
                    <CartDrawer>
                        <Button>
                            <IconShoppingBag />
                        </Button>
                    </CartDrawer>
                </div>
            </Container>
        </header>
    )
}
