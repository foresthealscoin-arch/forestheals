import type { Product } from '@/types/product';

const image = '/images/products/collagen-coffee.jpg';

export const products: Product[] = [
  {
    id: 'collagen-coffee',
    name: 'Collagen Coffee',
    slug: 'collagen-coffee',
    subtitle: 'Hair | Skin | Nails',
    description:
      'A functional daily coffee formulated with collagen and selected nutrients for a practical wellness ritual.',
    category: 'Collagen',
    priceCents: 99900,
    compareAtCents: 119900,
    image,
    images: [image, image, image],
    benefits: ['Skin support', 'Hair support', 'Daily ritual'],
    tags: ['bestseller', 'collagen', 'daily-wellness'],
    active: true,
    isBestSeller: true,
    rating: 4.9,
    stock: 100,
  },
  {
    id: 'digest-support',
    name: 'Digest Support',
    slug: 'digest-support',
    subtitle: 'Gut Health',
    description:
      'A daily blend created to complement an everyday digestive wellness routine.',
    category: 'Gut Health',
    priceCents: 89900,
    compareAtCents: 104900,
    image,
    images: [image, image],
    benefits: ['Digestive support', 'Daily gut care'],
    tags: ['gut-health', 'daily-wellness'],
    active: true,
    rating: 4.8,
    stock: 42,
  },
  {
    id: 'immunity-booster',
    name: 'Immunity Booster',
    slug: 'immunity-booster',
    subtitle: 'Daily Defense',
    description:
      'A supportive daily wellness formula designed for everyday balance and routine.',
    category: 'Immunity',
    priceCents: 84900,
    compareAtCents: 99900,
    image,
    images: [image, image],
    benefits: ['Daily wellness', 'Routine support'],
    tags: ['immunity', 'wellness'],
    active: true,
    isBestSeller: true,
    rating: 4.7,
    stock: 28,
  },
  {
    id: 'hydration-electrolytes',
    name: 'Hydration + Electrolytes',
    slug: 'hydration-electrolytes',
    subtitle: 'Daily Balance',
    description:
      'Hydration support for active days, designed to fit into a sustainable wellness routine.',
    category: 'Hydration',
    priceCents: 79900,
    compareAtCents: 94900,
    image,
    images: [image, image],
    benefits: ['Hydration', 'Everyday balance'],
    tags: ['hydration', 'daily-wellness'],
    active: true,
    rating: 4.6,
    stock: 17,
  },
  {
    id: 'sleep-restore',
    name: 'Sleep Restore',
    slug: 'sleep-restore',
    subtitle: 'Night Reset',
    description:
      'A calm, evening wellness supplement for restorative routines and recovery.',
    category: 'Sleep',
    priceCents: 94900,
    compareAtCents: 109900,
    image,
    images: [image, image],
    benefits: ['Evening reset', 'Calm routine'],
    tags: ['sleep', 'restorative'],
    active: true,
    rating: 4.8,
    stock: 19,
  },
];

export function getDevelopmentProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}
