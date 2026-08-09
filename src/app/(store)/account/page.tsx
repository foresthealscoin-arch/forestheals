'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function AccountPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold"
      >
        Your Account
      </motion.h1>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { href: '/account/orders', title: 'Orders', text: 'View your purchases.' },
          { href: '/account/profile', title: 'Profile', text: 'Manage your information.' },
          { href: '/account/health', title: 'Health Card', text: 'Your wellness profile.' },
        ].map((item, index) => (
          <motion.div key={item.href} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
            <Link href={item.href} className="block rounded-[28px] border border-[var(--border)] bg-[var(--paper)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--charcoal)] hover:bg-[var(--cream)]">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{item.text}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
