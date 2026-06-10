import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card } from "./Card";
import { ProductCatalogDTO } from "@/types/product-catalog-type";

type ProductCardProps = {
  product: ProductCatalogDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.productSlug}`;

  const priceFormatted = `€ ${Number(product.price).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Card className="min-w-55 rounded-sm bg-white md:min-w-0 overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-[4/2.35] overflow-hidden bg-zinc-100">
          {product.primaryImageUrl ? (
            <Image
              src={product.primaryImageUrl}
              alt={product.primaryImageAlt ?? product.productName}
              fill
              className="object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            // Placeholder finché non ci sono immagini
            <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
              <span className="text-xs text-zinc-400 font-medium">
                {product.productName.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={href}>
          <h3 className="text-sm font-bold leading-snug text-(--color-brand-black) hover:text-(--color-brand-green) transition-colors">
            {product.productName}
          </h3>
        </Link>

        <p className="mt-1 min-h-9 text-xs leading-4 text-(--color-brand-text)">
          {product.shortProductDescription}
        </p>

        {/* Niente tag per ora — non arrivano dal catalogo */}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-medium uppercase tracking-wide text-(--color-brand-muted)">
              {product.priceLabel}
            </span>
            <span className="mt-0.5 text-base font-bold text-(--color-brand-black)">
              {priceFormatted}
            </span>
          </div>

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
