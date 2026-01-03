'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <main className="min-h-screen flex items-center justify-center">
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
    </main>
  );
}