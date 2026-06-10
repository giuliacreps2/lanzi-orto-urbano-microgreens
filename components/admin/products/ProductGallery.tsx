"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  isPrimary?: boolean;
};

export function ProductGallery({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(
    images.findIndex((i) => i.isPrimary) ?? 0,
  );

  if (images.length === 0) {
    return (
      <div className="pd-gallery">
        <div className="pd-gallery-main">
          <div className="pd-gallery-placeholder" />
        </div>
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="pd-gallery">
      {/* Immagine principale */}
      <div className="pd-gallery-main">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail */}
      {images.length > 1 && (
        <div className="pd-gallery-thumbs">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`pd-gallery-thumb relative overflow-hidden rounded-lg transition-all ${
                i === activeIndex
                  ? "ring-2 ring-offset-1 ring-(--color-brand-green)"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Mostra immagine ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
