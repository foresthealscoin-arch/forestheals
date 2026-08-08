import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductGrid } from '@/components/store/product-grid';
import {
  getDevelopmentProductBySlug,
  products as developmentProducts,
} from '@/data/products';
import { getProductBySlug } from '@/lib/commerce/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const productFromDb = await getProductBySlug(slug).catch(() => null);
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
    image:
      productFromDb?.image ??
      fallbackProduct?.image ??
      '/images/products/collagen-coffee.jpg',
    images: productFromDb?.image
      ? [productFromDb.image]
      : (fallbackProduct?.images ?? [
          fallbackProduct?.image ?? '/images/products/collagen-coffee.jpg',
        ]),
    benefits: productFromDb?.benefits?.length
      ? productFromDb.benefits
      : (fallbackProduct?.benefits ?? []),
    tags: fallbackProduct?.tags ?? [],
    isBestSeller: fallbackProduct?.isBestSeller ?? false,
    compareAtCents: fallbackProduct?.compareAtCents,
    rating: fallbackProduct?.rating,
    ingredients: productFromDb?.ingredients?.length
      ? productFromDb.ingredients
      : (fallbackProduct?.ingredients ?? []),
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
        <ProductGallery
          images={
            product.images ?? [
              product.image ?? '/images/products/collagen-coffee.jpg',
            ]
          }
          name={product.name}
        />

        <ProductInfo product={product} />
      </div>

      {product.ingredients && product.ingredients.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">Ingredients</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {product.ingredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-4"
              >
                <span className="text-gray-800">{ingredient.name}</span>
                <span className="text-sm text-gray-500">
                  {ingredient.amount ?? 'As blended'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-500 uppercase">
                You may also like
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                Related products
              </h2>
            </div>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
}
