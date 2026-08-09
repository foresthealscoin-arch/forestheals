'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  getImageAltText,
  getLocalImagePath,
  type ImageSlot,
} from '@/lib/images/image-utils';

type SiteImageProps = {
  src?: string | null;
  fallbackSrc?: string | null;
  fallbackSources?: Array<string | null | undefined>;
  alt: string;
  slot?: ImageSlot;
  className?: string;
  placeholderClassName?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  preload?: boolean;
};

type ProductImageProps = Omit<SiteImageProps, 'alt' | 'fallbackSources'> & {
  productSlug: string;
  slot?: ImageSlot;
  alt?: string;
};

type BrandImageProps = Omit<SiteImageProps, 'alt' | 'fallbackSources'> & {
  slug: string;
  slot?: ImageSlot;
  alt?: string;
};

function uniqueSources(sources: Array<string | null | undefined>) {
  return [...new Set(sources.filter((source): source is string => Boolean(source)))];
}

export function SiteImage({
  src,
  fallbackSrc,
  fallbackSources,
  alt,
  slot,
  className,
  placeholderClassName,
  sizes,
  fill = false,
  width = 1200,
  height = 1200,
  loading = 'lazy',
  preload = false,
}: SiteImageProps) {
  const sources = useMemo(
    () => uniqueSources([src, fallbackSrc, ...(fallbackSources ?? [])]),
    [fallbackSources, fallbackSrc, src],
  );
  const sourceKey = sources.join('|');
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [sourceKey]);

  const source = sources[sourceIndex];

  if (!source) {
    return (
      <span
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        className={placeholderClassName ?? className ?? 'block bg-[var(--cream)]'}
      />
    );
  }

  const handleError = () => {
    setSourceIndex((current) => Math.min(current + 1, sources.length));
  };

  if (fill) {
    return (
      <Image
        src={source}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        loading={preload ? undefined : loading}
        preload={preload}
        data-image-slot={slot}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={source}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={preload ? undefined : loading}
      preload={preload}
      data-image-slot={slot}
      onError={handleError}
    />
  );
}

export function ProductImage({
  productSlug,
  slot = 'primary',
  alt = getImageAltText(productSlug),
  fallbackSrc,
  ...props
}: ProductImageProps) {
  return (
    <SiteImage
      {...props}
      alt={alt}
      slot={slot}
      fallbackSrc={fallbackSrc}
      fallbackSources={[getLocalImagePath('products', `${productSlug}.png`)]}
    />
  );
}

export function BrandImage({
  slug,
  slot = 'primary',
  alt = getImageAltText(slug),
  fallbackSrc,
  ...props
}: BrandImageProps) {
  return (
    <SiteImage
      {...props}
      alt={alt}
      slot={slot}
      fallbackSrc={fallbackSrc}
      fallbackSources={[getLocalImagePath('brand', `${slug}.png`)]}
    />
  );
}
