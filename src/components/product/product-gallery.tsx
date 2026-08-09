'use client';

import { useState } from 'react';
import { ProductImage, SiteImage } from '@/components/images/site-image';

type Props = {
  productSlug: string;
  images: string[];
  imageFallbacks?: string[];
  name: string;
};

export function ProductGallery({ productSlug, images, imageFallbacks, name }: Props) {
  const gallery = images.map((image, index) => ({
    src: image,
    fallbackSrc: imageFallbacks?.[index] ?? null,
  }));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = gallery[selectedIndex] ?? gallery[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[28px] bg-gray-100">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage
            productSlug={productSlug}
            slot={selectedIndex === 0 ? 'primary' : 'gallery'}
            src={selectedImage?.src}
            fallbackSrc={selectedImage?.fallbackSrc}
            alt={name}
            fill
            className="object-cover transition duration-300 hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholderClassName="block h-full w-full bg-gray-100"
          />
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              aria-label={`View product image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={`overflow-hidden rounded-2xl border bg-gray-100 transition ${
                selectedIndex === index ? 'border-black' : 'border-transparent'
              }`}
            >
              <div className="relative aspect-[4/5]">
                <SiteImage
                  src={image.src}
                  fallbackSrc={image.fallbackSrc}
                  alt={`${name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 12vw"
                  placeholderClassName="block h-full w-full bg-gray-100"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
