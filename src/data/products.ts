import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'collagen-coffee',
    name: 'Collagen Coffee',
    slug: 'collagen-coffee',
    subtitle: 'Hair | Skin | Nails',
    description:
      'A functional daily coffee formulated with collagen and selected nutrients.',
    category: 'Collagen',
    priceCents: 99900,
    image: '/images/products/collagen-coffee.webp',
    benefits: ['Skin support', 'Hair support', 'Nail support'],
    tags: ['bestseller', 'collagen', 'daily-wellness'],
    active: true,
  },
  {
    id: 'digest-support',
    name: 'Digest Support',
    slug: 'digest-support',
    subtitle: 'Gut Health',
    description:
      'Daily digestive support built around a functional wellness routine.',
    category: 'Gut Health',
    priceCents: 89900,
    image: '/images/products/digest-support.webp',
    benefits: ['Digestive support', 'Daily gut care'],
    tags: ['gut-health'],
    active: true,
  },
  {
    id: 'immunity-booster',
    name: 'Immunity Booster',
    slug: 'immunity-booster',
    subtitle: 'Daily Defense',
    description:
      'A daily wellness formula designed for everyday nutritional support.',
    category: 'Immunity',
    priceCents: 84900,
    image: '/images/products/immunity-booster.webp',
    benefits: ['Daily wellness', 'Nutritional support'],
    tags: ['immunity'],
    active: true,
  },
  {
    id: 'hydration-electrolytes',
    name: 'Hydration + Electrolytes',
    slug: 'hydration-electrolytes',
    subtitle: 'Daily Balance',
    description: 'Everyday hydration support with electrolytes.',
    category: 'Hydration',
    priceCents: 79900,
    image: '/images/products/hydration-electrolytes.webp',
    benefits: ['Hydration', 'Electrolyte support'],
    tags: ['hydration'],
    active: true,
  },
];
