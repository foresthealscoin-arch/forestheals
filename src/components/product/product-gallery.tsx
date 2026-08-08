'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const gallery = images.length > 0 ? images : ['/images/products/collagen-coffee.jpg'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = gallery[selectedIndex] ?? gallery[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[28px] bg-gray-100">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={selectedImage}
            alt={name}
            fill
            className="object-cover transition duration-300 hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`View product image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={`overflow-hidden rounded-2xl border bg-gray-100 transition ${
                selectedIndex === index ? 'border-black' : 'border-transparent'
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={image}
                  alt={`${name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 12vw"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
