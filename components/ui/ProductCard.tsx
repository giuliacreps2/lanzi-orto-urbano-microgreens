import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card } from "./Card";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="min-w-55 rounded-sm bg-white md:min-w-0 overflow-hidden">
      {/* Immagine prodotto */}
      <Link href={product.href} className="block">
        <div className="relative aspect-[4/2.35] overflow-hidden">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3">
        {/* Nome */}
        <Link href={product.href}>
          <h3 className="text-sm font-bold leading-snug text-(--color-brand-black) hover:text-(--color-brand-green) transition-colors">
            {product.productName}
          </h3>
        </Link>

        {/* Descrizione */}
        <p className="mt-1 min-h-9 text-xs leading-4 text-(--color-brand-text)">
          {product.shortProductDescription}
        </p>

        {/* Tag */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag.label}
              className="rounded-full border border-(--color-brand-border) px-2 py-0.5 text-[10px] font-medium text-(--color-brand-dark)"
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Prezzo + CTA */}
        <div className="mt-4 flex items-center justify-between gap-2">
          {/* Prezzo con etichetta */}
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-medium uppercase tracking-wide text-(--color-brand-muted)">
              Prezzo
            </span>
            <span className="mt-0.5 text-base font-bold text-(--color-brand-black)">
              {product.price}
            </span>
          </div>

          {/* Bottone carrello — stesso border-radius dei bottoni globali */}
          <button
            type="button"
            aria-label={`Aggiungi ${product.productName} al carrello`}
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-(--color-brand-dark) text-white transition-colors hover:bg-(--color-primary-green) active:scale-95"
          >
            <ShoppingCart size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </Card>
  );
}
