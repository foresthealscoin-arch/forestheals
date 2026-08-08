import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/ui/custom-cursor';

export const metadata: Metadata = {
  title: {
    default: 'Forestheals — Functional Essentials',
    template: '%s | Forestheals',
  },
  description:
    'Science-backed functional wellness products designed for everyday health.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--cream)] text-[var(--near-black)] antialiased">
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
