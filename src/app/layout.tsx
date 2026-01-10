import { Nunito } from 'next/font/google';
import { Header } from '@/components/shared/header';
import type { Metadata } from 'next';
import './globals.css';

const nunito = Nunito({
  subsets: ['cyrillic', 'latin'], 
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Burgers',
  description: 'Доставка вкусной еды',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={nunito.variable}>
      <body className={nunito.className}>
        <Header />
        <main>
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}
