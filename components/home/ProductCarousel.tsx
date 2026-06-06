import { Button } from "../ui/button";
import { ProductCard } from "../ui/ProductCard";
import type { Product } from "@/types/product";

type ProductCarouselProps = {
  title: string;
  description: string;
  products: Product[];
};

export function ProductCarousel({
  title,
  description,
  products,
}: ProductCarouselProps) {
  return (
    <section className="bg-(--color-brand-beige) px-5 py-10 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="section-title-black text-3xl leading-none tracking-[-0.03em] text-(--color-brand-black) md:text-4xl">
              {title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-(--color-brand-text)">
              {description}
            </p>
          </div>

          <Button href="/shop" variant="secondary" className="w-full md:w-fit">
            Vedi tutti i prodotti
          </Button>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
