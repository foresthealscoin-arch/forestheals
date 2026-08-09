import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductGrid } from '@/components/store/product-grid';
import { Reveal } from '@/components/ui/motion';
import { getDevelopmentProductBySlug, products as developmentProducts } from '@/data/products';
import { getProductBySlug } from '@/lib/commerce/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const productFromDb = await getProductBySlug(slug);
  const fallbackProduct = getDevelopmentProductBySlug(slug);

  const product = {
    ...fallbackProduct,
    ...productFromDb,
    id: productFromDb?.id ?? fallbackProduct?.id ?? slug,
    name: productFromDb?.name ?? fallbackProduct?.name ?? 'Product',
    slug: productFromDb?.slug ?? fallbackProduct?.slug ?? slug,
    description:
      productFromDb?.description ?? fallbackProduct?.description ?? '',
    category: fallbackProduct?.category ?? 'Wellness',
    priceCents: productFromDb?.priceCents ?? fallbackProduct?.priceCents ?? 0,
    image: productFromDb?.image ?? fallbackProduct?.image ?? '/images/products/collagen-coffee.jpg',
    images:
      productFromDb?.image
        ? [productFromDb.image]
        : fallbackProduct?.images ?? [fallbackProduct?.image ?? '/images/products/collagen-coffee.jpg'],
    benefits: productFromDb?.benefits?.length ? productFromDb.benefits : fallbackProduct?.benefits ?? [],
    tags: fallbackProduct?.tags ?? [],
    isBestSeller: fallbackProduct?.isBestSeller ?? false,
    compareAtCents: fallbackProduct?.compareAtCents,
    rating: fallbackProduct?.rating,
    ingredients:
      productFromDb?.ingredients?.length
        ? productFromDb.ingredients
        : fallbackProduct?.ingredients ?? [],
    stock: productFromDb?.stock ?? fallbackProduct?.stock ?? 0,
    active: productFromDb?.active ?? fallbackProduct?.active ?? true,
  };

  if (!product.name || !product.slug) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Product not found</h1>
      </main>
    );
  }

  const relatedProducts = developmentProducts
    .filter(
      (item) =>
        item.slug !== slug &&
        (item.category === product.category ||
          item.tags.some((tag) => product.tags.includes(tag))),
    )
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <Reveal>
          <ProductGallery
            images={product.images ?? [product.image ?? '/images/products/collagen-coffee.jpg']}
            name={product.name}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ProductInfo product={product} />
        </Reveal>
      </div>

      {product.benefits && product.benefits.length > 0 && (
        <Reveal delay={0.08} className="mt-16">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Benefits</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {product.benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="rounded-[22px] border border-[var(--border)] bg-[var(--paper)] p-5 text-sm text-[var(--muted-strong)]"
                  style={{ opacity: 1, transform: 'translateY(0)' }}
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--charcoal)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {product.ingredients && product.ingredients.length > 0 && (
        <Reveal delay={0.12} className="mt-16">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Ingredients</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {product.ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-center justify-between gap-4 rounded-[22px] border border-[var(--border)] bg-[var(--paper)] p-4"
                >
                  <span className="text-gray-800">{ingredient.name}</span>
                  <span className="text-sm text-gray-500">
                    {ingredient.amount ?? 'As blended'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {relatedProducts.length > 0 && (
        <Reveal delay={0.14} className="mt-20">
          <section>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  You may also like
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                  Related products
                </h2>
              </div>
            </div>

            <ProductGrid products={relatedProducts} />
          </section>
        </Reveal>
      )}
    </main>
  );
}
