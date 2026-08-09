'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { Product } from '@/types/product';
import { formatINR } from '@/lib/commerce/money';
import { useCartStore } from '@/lib/commerce/cart-store';
import { ProductImage } from '@/components/images/site-image';

export function ProductCard({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const isBestSeller = Boolean(product.isBestSeller || product.tags?.includes('bestseller'));
  const hasComparePrice =
    product.compareAtCents !== undefined &&
    product.compareAtCents > product.priceCents;

  function addToCart() {
    const variantId = product.variantId ?? product.id;

    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      variantName: product.variantName ?? 'Standard',
      priceCents: product.priceCents,
      quantity: 1,
      image: product.image ?? null,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  }

  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group flex h-full flex-col rounded-[28px] border border-[var(--border)] bg-[var(--paper)] p-3 shadow-[var(--shadow-soft)]"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="block"
        data-cursor="product"
        aria-label={`View ${product.name}`}
      >
        <div className="relative overflow-hidden rounded-[22px] bg-[rgba(29,27,26,0.03)]">
          {isBestSeller && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
              Best seller
            </span>
          )}

          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.42 }}
            className="relative block aspect-[4/5]"
          >
            <ProductImage
              productSlug={product.slug}
              slot="primary"
              src={product.image}
              fallbackSrc={product.imageFallback}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition duration-500"
              placeholderClassName="block h-full w-full bg-gray-100"
            />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
            {product.stock !== null && product.stock !== undefined && product.stock < 20 && (
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-700">
                Low stock
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[var(--muted)]">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2">
            <p className="text-base font-semibold text-gray-900">
              {formatINR(product.priceCents)}
            </p>
            {hasComparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatINR(product.compareAtCents ?? product.priceCents)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button
          type="button"
          onClick={addToCart}
          data-cursor="add"
          className="relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[var(--charcoal)] px-4 py-3 text-sm font-semibold text-[var(--cream)] shadow-[0_10px_22px_rgba(31,32,40,0.12)] transition hover:bg-[var(--blue-gray)] active:scale-[0.99]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={added ? 'added' : 'default'}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center"
            >
              {added ? 'Added' : 'Add to cart'}
            </motion.span>
          </AnimatePresence>
        </button>

        <Link
          href={`/shop/${product.slug}`}
          data-cursor="product"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold text-[var(--near-black)] transition hover:bg-[var(--cream)]"
        >
          View
        </Link>
      </div>
    </motion.article>
  );
}
