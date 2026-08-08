'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/commerce/cart-store';

const navItems = [
  { href: '/shop', label: 'SHOP' },
  { href: '/collections', label: 'FUNCTIONAL' },
  { href: '/best-sellers', label: 'BESTSELLERS' },
  { href: '/about', label: 'OUR STORY' },
  { href: '/ai', label: 'AI' },
];

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[var(--line)] transition-all duration-200 ${
        scrolled ? 'bg-[var(--charcoal)] text-[var(--cream)]' : 'bg-[var(--cream)] text-[var(--near-black)]'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="logo text-xl uppercase tracking-[0.12em] text-current">
          FORESTHEALS
        </Link>

        <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.16em] md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item relative pb-1 transition ${
                  active ? 'text-current' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-current" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-[6px] border border-current/20 bg-transparent sm:inline-flex">
            <Search size={16} />
          </button>

          <Link href="/account" className="hidden items-center gap-2 rounded-[6px] border border-current/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] sm:inline-flex">
            <User size={14} />
            ACCOUNT
          </Link>

          <Link href="/cart" aria-label={`Cart with ${count} items`} className="relative flex h-10 w-10 items-center justify-center rounded-[6px] border border-current/20 bg-[var(--blue-gray)] text-[var(--cream)]">
            <ShoppingBag size={16} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--cream)] px-1 text-[9px] font-bold text-[var(--near-black)] ring-2 ring-[var(--charcoal)]"
              >
                {count > 99 ? '99+' : count}
              </motion.span>
            )}
          </Link>

          <button type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((state) => !state)} className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-current/20 md:hidden">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} className="border-t border-[var(--line)] bg-[var(--cream)] md:hidden">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div key={item.href} initial={reduceMotion ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-[8px] px-3 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--near-black)] hover:bg-[var(--paper)]">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
