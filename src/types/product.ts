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
  imageFallback?: string | null;
  images?: string[];
  imageFallbacks?: string[];
  compareAtCents?: number;
  benefits: string[];
  tags: string[];
  active: boolean;
  isBestSeller?: boolean;
  rating?: number;
  ingredients?: Array<{
    name: string;
    amount?: string | null;
  }>;
};
