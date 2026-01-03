'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        <main className="min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto p-6">
                <h2 className="text-2xl mb-4">Вход</h2>
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
        </main>
    );
}