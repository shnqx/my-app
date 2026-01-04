'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

interface Props {
  className?: string;
}

export const RegisterModal: React.FC<Props> = ({ className }) => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const isOpen = pathname === '/register';

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError('Введите email и пароль');
      return;
    }
    if (password !== confirm) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data?.user) {
      setMessage('Аккаунт создан. Выполните вход или подтвердите email, если требуется.');
      router.push('/login');
    } else {
      setMessage('Письмо для подтверждения отправлено. Проверьте почту.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'w-[350px] max-w-[350px] min-h-[350] rounded-2xl bg-background pt-10 pr-10',
          className,
        )}>
        <DialogTitle className="mb-8 text-center text-2xl text-primary font-bold">Регистрация</DialogTitle>


        <div className="grid w-full gap-6">
          <InputGroup>
            <InputGroupInput
              required
              value={email}
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
              value={password}
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
        <div className="grid w-full gap-6">
          <InputGroup>
            <InputGroupInput
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Пароль"
            />
            <InputGroupAddon className="mr-5" align="inline-end">
              <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                <CircleX className="size-3" />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button onClick={handleRegister} className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Зарегистрироваться
        </Button>
        <Button onClick={() => router.push("/login")} variant="outline">
          Вход
        </Button>
        <h1>{message}</h1>
        <h1>{error}</h1>

        {/* <main className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">Регистрация</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
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
                  required
                />
              </label>

              <label>
                <span className="text-sm">Подтвердите пароль</span>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </label>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 border rounded"
                >
                  Войти
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