'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatINR } from '@/lib/commerce/money';
import { useCartStore } from '@/lib/commerce/cart-store';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  function addToCart() {
    if (!product.variantId) {
      alert('This product is not available yet.');
      return;
    }

    addItem({
      productId: product.id,
      variantId: product.variantId,
      name: product.name,
      variantName: product.variantName ?? 'Standard',
      priceCents: product.priceCents,
      quantity: 1,
      image: product.image ?? null,
    });
  }

  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={945}
              height={1181}
              className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="aspect-[4/5] bg-gray-100" />
          )}
        </div>

        <div className="pt-4">
          <h3 className="text-base font-medium">{product.name}</h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {product.subtitle}
          </p>

          <p className="mt-2 font-semibold">
            {formatINR(product.priceCents)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={addToCart}
        className="mt-4 flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
      >
        Add to Cart
      </button>
    </article>
  );
}
