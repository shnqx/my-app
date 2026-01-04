'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

interface Props {
    className?: string;
}

export const LoginModal: React.FC<Props> = ({ className }) => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();

    const isOpen = pathname === '/login';

    const signInPassword = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        if (data?.session) {
            router.refresh();
            router.push('/');
        } else {
            setMessage('Вход инициирован. Проверьте почту или попробуйте ещё раз.');
        }
    };

    const sendMagicLink = async () => {
        if (!email) {
            setError('Введите email');
            return;
        }
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.signInWithOtp({ email });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setMessage('Письмо для входа отправлено. Проверьте почту.');
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'w-[350px] max-w-[350px] min-h-[350px] rounded-2xl bg-background pt-10 pr-10',
                    className,
                )}>
                <DialogTitle className="mb-8 text-center text-2xl text-primary font-bold">Вход на сайт</DialogTitle>
                <div className="grid w-full gap-6">
                    <InputGroup>
                        <InputGroupInput
                            required
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputGroupAddon className="mr-5" align="inline-end">
                            <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                                <CircleX className="size-3" />
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="grid w-full gap-6">
                    <InputGroup>
                        <InputGroupInput
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                        />
                        <InputGroupAddon className="mr-5" align="inline-end">
                            <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                                <CircleX className="size-3" />
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Button onClick={signInPassword} className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Войти
                </Button>
                <Button onClick={() => router.push("/register")} variant="outline">
                    Регистрация
                </Button>
                <h1>{message}</h1>
                <h1>{error}</h1>
                <h1>тест логин: shnqx@mail.ru</h1>
                <h1>тест пароль: RCFHY016</h1>


                {/* <main className="min-h-screen flex items-center justify-center">
                    <div className="max-w-md mx-auto p-6">
                        <DialogTitle>Вход</DialogTitle>
                        <form onSubmit={signInPassword} className="flex flex-col gap-3">
                            <label>
                                <span className="text-sm">Email</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </label>
                            <label>
                                <span className="text-sm">Пароль</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-white rounded"
                                >
                                    {loading ? 'Вхожу...' : 'Войти'}
                                </button>

                                <button
                                    type="button"
                                    onClick={sendMagicLink}
                                    disabled={loading}
                                    className="px-4 py-2 border rounded"
                                >
                                    Отправить ссылку
                                </button>

                                <button
                                    type="button"
                                    onClick={signOut}
                                    className="px-4 py-2 border rounded"
                                >
                                    Выйти
                                </button>
                            </div>

                            {message && <p className="text-sm text-green-600">{message}</p>}
                            {error && <p className="text-sm text-red-600">{error}</p>}
                        </form>
                    </div>
                </main> */}
            </DialogContent>
        </Dialog>
    );
}