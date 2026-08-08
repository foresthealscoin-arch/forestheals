import { getProductBySlug } from '@/lib/commerce/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <main className="p-8">Product not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Forestheals
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium">
            ₹{((product.priceCents ?? 0) / 100).toLocaleString('en-IN')}
          </p>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Benefits</h2>

            <ul className="mt-4 space-y-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="rounded-xl bg-gray-50 p-4">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              {product.variantName}
            </p>

            <p className="mt-1 text-sm">
              {product.stock} available
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
