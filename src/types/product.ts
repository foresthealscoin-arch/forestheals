export type Product = {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description?: string;
  category: string;
  priceCents: number;
  compareAtCents?: number;
  image: string;
  benefits: string[];
  tags: string[];
  active: boolean;
};
