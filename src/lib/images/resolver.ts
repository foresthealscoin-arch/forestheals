import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import {
  detectSiteImage,
  getProductImageEntitySlugs,
  imageCategories,
  type DetectedSiteImage,
  type ImageEntityType,
  type ImageSlot,
  type ResolvedSiteImage,
} from './image-utils';

type RemoteSiteImage = {
  filename: string;
  category: DetectedSiteImage['category'];
  storage_path: string;
  public_url: string | null;
  alt_text: string | null;
  entity_type: ImageEntityType;
  entity_slug: string;
  slot: ImageSlot;
  sort_order: number;
  needs_review: boolean;
};

type ImageResolverOptions = {
  includeNeedsReview?: boolean;
};

const slotOrder: Record<ImageSlot, number> = {
  primary: 0,
  secondary: 10,
  thumbnail: 20,
  gallery: 30,
  lifestyle: 40,
  benefits: 50,
  hero: 60,
};

function getSupabasePublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function getLocalImages() {
  const result: DetectedSiteImage[] = [];

  await Promise.all(
    imageCategories.map(async (category) => {
      const directory = path.join(process.cwd(), 'public', 'images', category);

      try {
        const entries = await readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
          if (!entry.isFile()) continue;

          const image = detectSiteImage(category, entry.name);
          if (image) result.push(image);
        }
      } catch {
        // The local source folders are optional in deployed environments.
      }
    }),
  );

  return result;
}

async function getRemoteImages({
  entityType,
  entitySlugs,
  page,
  slot,
  includeNeedsReview = false,
}: {
  entityType?: ImageEntityType;
  entitySlugs?: string[];
  page?: string;
  slot?: ImageSlot;
  includeNeedsReview?: boolean;
}) {
  const client = getSupabasePublicClient();

  if (!client) return [] as RemoteSiteImage[];

  try {
    let query = client
      .from('site_images')
      .select(
        'filename, category, storage_path, public_url, alt_text, entity_type, entity_slug, slot, sort_order, needs_review',
      )
      .eq('is_active', true);

    if (!includeNeedsReview) {
      query = query.eq('needs_review', false);
    }

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    if (entitySlugs?.length) {
      query = query.in('entity_slug', entitySlugs);
    }

    if (page) {
      query = query.eq('page', page);
    }

    if (slot) {
      query = query.eq('slot', slot);
    }

    const { data, error } = await query.order('sort_order', { ascending: true });

    if (error || !data) return [] as RemoteSiteImage[];

    return data as RemoteSiteImage[];
  } catch {
    // A local asset can render while Supabase is unavailable or not configured.
    return [] as RemoteSiteImage[];
  }
}

function toResolvedImage(
  image: RemoteSiteImage | DetectedSiteImage,
  fallbackImage: DetectedSiteImage | undefined,
): ResolvedSiteImage | null {
  const remoteImage = 'public_url' in image ? image : null;
  const localImage = remoteImage ? fallbackImage : image;
  const src = remoteImage?.public_url ?? localImage?.localPath;

  if (!src || !localImage) return null;

  return {
    src,
    fallbackSrc: remoteImage ? fallbackImage?.localPath ?? null : null,
    alt: remoteImage?.alt_text ?? localImage.altText,
    filename: remoteImage?.filename ?? localImage.filename,
    category: remoteImage?.category ?? localImage.category,
    entityType: remoteImage?.entity_type ?? localImage.entityType,
    entitySlug: remoteImage?.entity_slug ?? localImage.entitySlug,
    slot: remoteImage?.slot ?? localImage.slot,
    sortOrder: remoteImage?.sort_order ?? localImage.sortOrder,
  };
}

function sortImages(
  images: Array<{ image: ResolvedSiteImage; isRemote: boolean; entityIndex: number }>,
) {
  return images
    .sort((left, right) => {
      const slotDifference = slotOrder[left.image.slot] - slotOrder[right.image.slot];

      if (slotDifference) return slotDifference;
      if (left.isRemote !== right.isRemote) return left.isRemote ? -1 : 1;
      if (left.entityIndex !== right.entityIndex) return left.entityIndex - right.entityIndex;
      if (left.image.sortOrder !== right.image.sortOrder) {
        return left.image.sortOrder - right.image.sortOrder;
      }

      return left.image.filename.localeCompare(right.image.filename);
    })
    .map(({ image }) => image);
}

async function resolveProductImageSets(
  productSlugs: string[],
  { includeNeedsReview = false }: ImageResolverOptions = {},
) {
  const uniqueProductSlugs = [...new Set(productSlugs)];
  const entitySlugs = [...new Set(uniqueProductSlugs.flatMap(getProductImageEntitySlugs))];
  const [localImages, remoteImages] = await Promise.all([
    getLocalImages(),
    getRemoteImages({
      entityType: 'product',
      entitySlugs,
      includeNeedsReview,
    }),
  ]);
  const localProductImages = localImages.filter(
    (image) => image.entityType === 'product' && (includeNeedsReview || !image.needsReview),
  );
  const localByStoragePath = new Map(
    localProductImages.map((image) => [image.storagePath, image]),
  );
  const output = new Map<string, ResolvedSiteImage[]>();

  for (const productSlug of uniqueProductSlugs) {
    const candidates = getProductImageEntitySlugs(productSlug);
    const imageSources: Array<{
      image: ResolvedSiteImage;
      isRemote: boolean;
      entityIndex: number;
    }> = [];
    const seenStoragePaths = new Set<string>();

    for (const [entityIndex, entitySlug] of candidates.entries()) {
      for (const remoteImage of remoteImages) {
        if (remoteImage.entity_slug !== entitySlug) continue;

        const resolved = toResolvedImage(
          remoteImage,
          localByStoragePath.get(remoteImage.storage_path),
        );

        if (resolved) {
          imageSources.push({ image: resolved, isRemote: true, entityIndex });
          seenStoragePaths.add(remoteImage.storage_path);
        }
      }

      for (const localImage of localProductImages) {
        if (localImage.entitySlug !== entitySlug || seenStoragePaths.has(localImage.storagePath)) {
          continue;
        }

        const resolved = toResolvedImage(localImage, undefined);

        if (resolved) {
          imageSources.push({ image: resolved, isRemote: false, entityIndex });
        }
      }
    }

    output.set(productSlug, sortImages(imageSources));
  }

  return output;
}

export async function getProductImage(
  productSlug: string,
  slot: ImageSlot = 'primary',
  options?: ImageResolverOptions,
) {
  const imageSets = await resolveProductImageSets([productSlug], options);
  return imageSets.get(productSlug)?.find((image) => image.slot === slot) ?? null;
}

export async function getProductImages(
  productSlug: string,
  options?: ImageResolverOptions,
) {
  const imageSets = await resolveProductImageSets([productSlug], options);
  return imageSets.get(productSlug) ?? [];
}

export async function getProductImageMap(
  productSlugs: string[],
  slot: ImageSlot = 'primary',
  options?: ImageResolverOptions,
) {
  const imageSets = await resolveProductImageSets(productSlugs, options);

  return new Map(
    [...imageSets.entries()].map(([productSlug, images]) => [
      productSlug,
      images.find((image) => image.slot === slot) ?? null,
    ]),
  );
}

export async function getBrandImage(
  slug: string,
  slot: ImageSlot = 'primary',
  { includeNeedsReview = false }: ImageResolverOptions = {},
) {
  const [localImages, remoteImages] = await Promise.all([
    getLocalImages(),
    getRemoteImages({
      entityType: 'brand',
      entitySlugs: [slug],
      slot,
      includeNeedsReview,
    }),
  ]);
  const localImage = localImages.find(
    (image) =>
      image.entityType === 'brand' &&
      image.entitySlug === slug &&
      image.slot === slot &&
      (includeNeedsReview || !image.needsReview),
  );
  const remoteImage = remoteImages.find((image) => image.entity_slug === slug);

  if (remoteImage) {
    const matchingLocalImage = localImages.find(
      (image) => image.storagePath === remoteImage.storage_path,
    );

    return toResolvedImage(remoteImage, matchingLocalImage);
  }

  return localImage ? toResolvedImage(localImage, undefined) : null;
}

export async function getPageImages(
  page: string,
  slot?: ImageSlot,
  { includeNeedsReview = false }: ImageResolverOptions = {},
) {
  const [localImages, remoteImages] = await Promise.all([
    getLocalImages(),
    getRemoteImages({ page, slot, includeNeedsReview }),
  ]);
  const localByStoragePath = new Map(
    localImages.map((image) => [image.storagePath, image]),
  );

  return remoteImages
    .map((image) => toResolvedImage(image, localByStoragePath.get(image.storage_path)))
    .filter((image): image is ResolvedSiteImage => Boolean(image));
}
