import { getProductBySlug } from '@/lib/commerce/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Forestheals
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium">
            ₹{((product.priceCents ?? 0) / 100).toLocaleString('en-IN')}
          </p>

          {product.variantName && (
            <p className="mt-2 text-sm text-gray-500">
              {product.variantName}
            </p>
          )}

          {product.description && (
            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>
          )}

          {product.benefits.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Benefits</h2>

              <ul className="mt-4 space-y-3">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.ingredients.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold">Ingredients</h2>

              <div className="mt-4 space-y-3">
                {product.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="flex justify-between gap-4 rounded-xl bg-gray-50 p-4"
                  >
                    <span>{ingredient.name}</span>
                    <span className="text-gray-500">
                      {ingredient.amount}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Availability</p>
            <p className="mt-1">
              {product.stock ?? 0} units available
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
