"use client"

import { cn } from "../../lib/utils"
import React, { useState, useEffect, useRef } from "react"
import { useDebounce } from "use-debounce"
import { IconUserFilled, IconShoppingBag, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Container } from "./container"
import { CartDrawer } from "./cart-drawer"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { CircleX } from 'lucide-react';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [products, setProducts] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedQuery] = useDebounce(query, 500)

    useEffect(() => {
        const searchProducts = async () => {
            if (debouncedQuery.length < 2) {
                setProducts([])
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/products/search-products?search=${debouncedQuery}`)
                const data = await response.json()
                setProducts(data)
                setOpen(true)
            } catch (error) {
                console.error("Ошибка поиска:", error)
            } finally {
                setIsLoading(false)
            }
        }

        searchProducts()
    }, [debouncedQuery])

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            router.refresh();
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
        <header className={cn('sticky px-4 top-0 z-50 border-b bg-secondary border-gray-100', className)}>
            <Container className="flex items-center justify-between py-4">
                <div>
                    <h1 onClick={() => router.push("/")} className="text-2xl uppercase text-primary font-black">Burgers</h1>
                    <p className="text-sm text-gray-400 leading-3">Просто вкусно</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                        {isEditing ? (
                            <div className="w-full max-w-sm relative">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <div className="w-[300px]">
                                            <InputGroup className="bg-card rounded-full h-12 w-full flex items-center">
                                                <InputGroupInput
                                                    ref={inputRef}
                                                    placeholder="Поиск товаров..."
                                                    value={query}
                                                    onChange={(e) => {
                                                        setQuery(e.target.value)
                                                        if (e.target.value.length > 0) setOpen(true)
                                                    }}
                                                    onFocus={() => query.length > 0 && setOpen(true)}
                                                    className="bg-transparent border-none focus:ring-0"
                                                />
                                                <InputGroupAddon className="mr-3" align="inline-end">
                                                    <InputGroupButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setQuery("");
                                                            setOpen(false);
                                                            setIsEditing(false);
                                                        }}
                                                        className="bg-transparent border-none p-0 text-muted-foreground hover:text-primary hover:bg-transparent transition-colors"
                                                    >
                                                        <CircleX className="size-5" />
                                                    </InputGroupButton>
                                                </InputGroupAddon>
                                            </InputGroup>


                                        </div>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        sideOffset={8}
                                        className="p-0 border-none bg-transparent shadow-xl"
                                        style={{ width: 'var(--radix-popover-trigger-width)' }}
                                        align="start"
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                        onInteractOutside={() => setIsEditing(false)}
                                    >
                                        <Command className="w-full rounded-lg border bg-card shadow-md">
                                            <CommandList className="w-full max-h-[300px]">
                                                <CommandEmpty>Ничего не найдено</CommandEmpty>
                                                <CommandGroup>
                                                    {products.map((product) => (
                                                        <CommandItem
                                                            key={product.id}
                                                            className="flex items-center w-full px-4 py-2 cursor-pointer"
                                                            onSelect={() => {
                                                                setQuery(product.name)
                                                                setOpen(false)
                                                                setIsEditing(false)
                                                                router.push(`/product/${product.id}`)
                                                            }}
                                                        >
                                                            <span className="truncate">{product.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} variant="ghost" size="icon-lg" className="rounded-full">
                                <IconSearch />
                            </Button>
                        )}
                    </div>

                    {!isEditing && <div className="flex items-center gap-2">
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
                    </div>}
                </div>
            </Container>
        </header>

    )
}
