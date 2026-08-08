export type Product = {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description?: string;
  category: string;
  priceCents: number;
  variantId?: string | null;
  variantName?: string | null;
  stock?: number | null;
  image: string | null;
  compareAtCents?: number;
  benefits: string[];
  tags: string[];
  active: boolean;
};
