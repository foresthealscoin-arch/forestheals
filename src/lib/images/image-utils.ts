export const imageCategories = ['products', 'brand'] as const;

export type ImageCategory = (typeof imageCategories)[number];

export const imageSlots = [
  'primary',
  'secondary',
  'thumbnail',
  'gallery',
  'hero',
  'lifestyle',
  'benefits',
] as const;

export type ImageSlot = (typeof imageSlots)[number];

export type ImageEntityType = 'product' | 'brand';

export type DetectedSiteImage = {
  filename: string;
  slug: string;
  category: ImageCategory;
  storagePath: string;
  localPath: string;
  altText: string;
  entityType: ImageEntityType;
  entitySlug: string;
  slot: ImageSlot;
  page: string;
  position: string;
  sortOrder: number;
  needsReview: boolean;
  variant: string | null;
};

export type ResolvedSiteImage = {
  src: string;
  fallbackSrc: string | null;
  alt: string;
  filename: string;
  category: ImageCategory;
  entityType: ImageEntityType;
  entitySlug: string;
  slot: ImageSlot;
  sortOrder: number;
};

const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

const productSlotSuffixes: Array<{
  suffix: string;
  slot: ImageSlot;
  needsReview?: boolean;
}> = [
  { suffix: 'benefits-sachet', slot: 'benefits' },
  { suffix: 'front-benefits', slot: 'benefits', needsReview: true },
  { suffix: 'why-buy', slot: 'benefits', needsReview: true },
  { suffix: 'lifestyle', slot: 'lifestyle' },
  { suffix: 'secondary', slot: 'secondary' },
  { suffix: 'thumbnail', slot: 'thumbnail' },
  { suffix: 'gallery', slot: 'gallery' },
  { suffix: 'benefits', slot: 'benefits' },
  { suffix: 'primary', slot: 'primary' },
  { suffix: 'hero', slot: 'hero' },
];

const productSlotOrder: Record<ImageSlot, number> = {
  primary: 0,
  secondary: 10,
  thumbnail: 20,
  gallery: 30,
  lifestyle: 40,
  benefits: 50,
  hero: 60,
};

const productAliases: Record<string, string[]> = {
  'collagen-coffee': ['kaphi-aura-coffee'],
  'hydration-electrolytes': ['forestheals-hydrate'],
  'sleep-restore': ['forestheals-sleep'],
};

const reviewRequiredFilenames = new Set([
  'forestheals-calm-your-mind.png',
  'forestheals-clean-slate-detox-cleanse-kit.png',
  'kaphi-coffee-gift-box.png',
  'prateek-raj-kumawat-founder-ceo.png',
]);

const initialisms: Record<string, string> = {
  ceo: 'CEO',
  mct: 'MCT',
  sku: 'SKU',
};

function getExtension(filename: string) {
  const extensionIndex = filename.lastIndexOf('.');
  return extensionIndex === -1 ? '' : filename.slice(extensionIndex).toLowerCase();
}

function getSlugFromFilename(filename: string) {
  const extension = getExtension(filename);
  return filename.slice(0, filename.length - extension.length).toLowerCase();
}

function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();

      if (initialisms[lower]) return initialisms[lower];
      if (/^\d+(g|kg|ml|l|ct|pack)$/i.test(word)) return word.toLowerCase();

      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(' ');
}

export function getImageAltText(value: string) {
  return titleCase(value);
}

function getBrandPlacement(slug: string) {
  if (slug.endsWith('founder-portrait')) {
    return { page: 'about', position: 'founder' };
  }

  if (slug.endsWith('founder-ceo-illustration')) {
    return { page: 'about', position: 'founder-illustration' };
  }

  if (slug.startsWith('forestheals-made-in-india')) {
    return { page: 'about', position: 'brand-story' };
  }

  return { page: 'brand', position: 'primary' };
}

function getProductEntity(slug: string) {
  for (const rule of productSlotSuffixes) {
    const suffix = `-${rule.suffix}`;

    if (slug.endsWith(suffix)) {
      return {
        entitySlug: slug.slice(0, -suffix.length),
        slot: rule.slot,
        variant: null,
        needsReview: Boolean(rule.needsReview),
      };
    }
  }

  const variantMatch = slug.match(/-(\d+(?:g|kg|ml|l|ct|pack))$/i);

  if (variantMatch) {
    return {
      entitySlug: slug.slice(0, -variantMatch[0].length),
      slot: 'primary' as const,
      variant: variantMatch[1].toLowerCase(),
      needsReview: false,
    };
  }

  return {
    entitySlug: slug,
    slot: 'primary' as const,
    variant: null,
    needsReview: false,
  };
}

export function isSupportedSiteImage(filename: string) {
  return supportedExtensions.has(getExtension(filename));
}

export function getLocalImagePath(category: ImageCategory, filename: string) {
  return `/images/${category}/${encodeURIComponent(filename)}`;
}

export function getProductImageEntitySlugs(productSlug: string) {
  return [productSlug, ...(productAliases[productSlug] ?? [])];
}

export function detectSiteImage(
  category: ImageCategory,
  filename: string,
): DetectedSiteImage | null {
  if (!isSupportedSiteImage(filename)) return null;

  const slug = getSlugFromFilename(filename);
  const entityType: ImageEntityType = category === 'products' ? 'product' : 'brand';

  if (entityType === 'brand') {
    const placement = getBrandPlacement(slug);

    return {
      filename,
      slug,
      category,
      storagePath: `${category}/${filename}`,
      localPath: getLocalImagePath(category, filename),
      altText: getImageAltText(slug),
      entityType,
      entitySlug: slug,
      slot: 'primary',
      page: placement.page,
      position: placement.position,
      sortOrder: 0,
      needsReview: reviewRequiredFilenames.has(filename),
      variant: null,
    };
  }

  const product = getProductEntity(slug);

  return {
    filename,
    slug,
    category,
    storagePath: `${category}/${filename}`,
    localPath: getLocalImagePath(category, filename),
    altText: getImageAltText(slug),
    entityType,
    entitySlug: product.entitySlug,
    slot: product.slot,
    page: 'product',
    position: product.slot,
    sortOrder: productSlotOrder[product.slot],
    needsReview: product.needsReview || reviewRequiredFilenames.has(filename),
    variant: product.variant,
  };
}
