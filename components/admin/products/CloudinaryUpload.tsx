"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import type { ProductImagePayload } from "@/types/product";

type CloudinaryUploadProps = {
  images: ProductImagePayload[];
  onChange: (
    images:
      | ProductImagePayload[]
      | ((prev: ProductImagePayload[]) => ProductImagePayload[]),
  ) => void;
};

export function CloudinaryUpload({ images, onChange }: CloudinaryUploadProps) {
  const handleUploadSuccess = (result: any) => {
    if (result.info && typeof result.info !== "string") {
      // ✅ usa la versione funzionale di onChange per leggere lo stato aggiornato
      onChange((currentImages: ProductImagePayload[]) => {
        const newImage: ProductImagePayload = {
          urlImage: result.info.secure_url,
          cloudinaryPublicId: result.info.public_id,
          altText: result.info.original_filename || "Immagine prodotto",
          isPrimary: currentImages.length === 0,
          sortOrder: currentImages.length,
        };
        return [...currentImages, newImage];
      });
    }
  };

  const removeImage = (publicId: string) => {
    const updated = images.filter((img) => img.cloudinaryPublicId !== publicId);
    if (
      images.find((img) => img.cloudinaryPublicId === publicId)?.isPrimary &&
      updated.length > 0
    ) {
      updated[0] = { ...updated[0], isPrimary: true };
    }
    onChange(updated);
  };

  const setPrimary = (publicId: string) => {
    onChange(
      images.map((img) => ({
        ...img,
        isPrimary: img.cloudinaryPublicId === publicId,
      })),
    );
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card/50 p-4">
      <h3 className="text-sm font-semibold">Galleria Immagini Prodotto</h3>

      {/* Griglia immagini */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.cloudinaryPublicId}
              className="group relative aspect-square overflow-hidden rounded-md border bg-muted"
            >
              <img
                src={img.urlImage}
                alt={img.altText}
                className="h-full w-full object-cover"
              />
              {img.isPrimary && (
                <span className="absolute left-1 top-1 rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  Principale
                </span>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {!img.isPrimary && (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setPrimary(img.cloudinaryPublicId)}
                  >
                    Metti in evidenza
                  </Button>
                )}
                <Button
                  variant="adminOutline"
                  type="button"
                  onClick={() => removeImage(img.cloudinaryPublicId)}
                >
                  Rimuovi
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Widget sempre montato, senza logica widgetReady */}
      <CldUploadWidget
        uploadPreset="Lanzi-Orto-Urbano"
        onSuccess={handleUploadSuccess}
        options={{
          multiple: true, // ✅ permette selezione multipla
          maxFiles: 10,
          sources: ["local", "url", "camera"],
        }}
      >
        {({ open }) => (
          <Button type="button" variant="adminOutline" onClick={() => open()}>
            {images.length === 0
              ? "Carica Foto"
              : `Aggiungi foto (${images.length} caricate)`}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
