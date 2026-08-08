import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatINR } from '@/lib/commerce/money';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        <div className="pt-4">
          <h3 className="text-base font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{product.subtitle}</p>
          <p className="mt-2 font-semibold">{formatINR(product.priceCents)}</p>
        </div>
      </Link>
    </article>
  );
}
