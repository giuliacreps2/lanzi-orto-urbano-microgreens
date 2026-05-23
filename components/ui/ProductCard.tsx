import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card } from "./Card";
import type { Product } from "@/src/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="min-w-[220px] rounded-md bg-white md:min-w-0">
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
        <Link href={product.href}>
          <h3 className="text-sm font-semibold text-[var(--color-brand-black)]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 min-h-9 text-xs leading-4 text-[var(--color-brand-text)]">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag.label}
              className="rounded-full border border-[var(--color-brand-border)] px-2 py-0.5 text-[10px] text-[var(--color-brand-dark)]"
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--color-brand-black)]">
            {product.price}
          </p>

          <button
            type="button"
            aria-label={`Aggiungi ${product.name} al carrello`}
            /*className="flex size-8 items-center justify-center rounded border border-[var(--color-brand-border)] text-[var(--color-brand-dark)] transition hover:bg-[#e9eee3]"*/
            className="flex size-8 items-center justify-center rounded bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] transition hover:bg-[var(--color-brand-green)]"
          >
            <ShoppingCart size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </Card>
  );
}