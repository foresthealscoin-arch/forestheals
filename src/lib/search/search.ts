export function searchProducts<T extends {
  name: string;
  description?: string | null;
  slug: string;
}>(
  products: T[],
  query: string,
) {
  const q = query.trim().toLowerCase();

  if (!q) return products;

  return products.filter((product) =>
    [
      product.name,
      product.description ?? '',
      product.slug,
    ]
      .join(' ')
      .toLowerCase()
      .includes(q),
  );
}
