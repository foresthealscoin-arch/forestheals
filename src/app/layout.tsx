import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { PageTransition } from '@/components/ui/motion';

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[var(--accent-soft)] selection:text-[var(--foreground)]">
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
