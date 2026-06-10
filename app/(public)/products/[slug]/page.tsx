import { getProductDetail, getRelatedProducts } from "@/lib/api/products";
import { mapProductDetailToPageData } from "@/lib/mappers/productMapper";
import { PricingBlock } from "@/components/products/PricingBlock";
import { ProductWhySection } from "@/components/products/ProductWhySection";
import { ProductHowSection } from "@/components/products/ProductHowSection";
import { ProductInfoSection } from "@/components/products/ProductInfoSection";
import { ProductPairingsSection } from "@/components/products/ProductPairingSection";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import type { WhyCard, HowItem, RelatedProduct } from "@/types/product-types";
import Image from "next/image";
import { ProductGallery } from "@/components/admin/products/ProductGallery";

type Props = { params: Promise<{ slug: string }> };

function StarRating({ score, count }: { score: number; count: number }) {
  return (
    <div className="pd-rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={1.5}
          className={
            i < Math.round(score) ? "pd-star--filled" : "pd-star--empty"
          }
          aria-hidden="true"
        />
      ))}
      <span className="pd-rating-count">({count} Recensioni Aziendali)</span>
    </div>
  );
}

function formatPrice(cents: number) {
  return `€ ${(cents / 100).toLocaleString("it-IT", { minimumFractionDigits: 2 })}`;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product;
  let relatedRaw: any[] = [];

  try {
    const [dto, related] = await Promise.all([
      getProductDetail(slug),
      getRelatedProducts(slug),
    ]);
    product = mapProductDetailToPageData(dto);
    relatedRaw = related;
  } catch {
    notFound();
  }

  // Estrai technicalDetails dalla prima variante
  const td = product.variants[0]?.technicalDetails ?? {};

  // Costruisci WhyCards dagli attributi
  const whyCards: WhyCard[] = [1, 2, 3, 4]
    .map((n) => ({
      title: String(td[`benefit_${n}_title`] ?? ""),
      description: String(td[`benefit_${n}_text`] ?? ""),
    }))
    .filter((c) => c.title); // mostra solo le card compilate

  // Costruisci HowItems dagli attributi
  const howItems: HowItem[] = [1, 2, 3]
    .map((n) => ({
      title: String(td[`use_${n}_title`] ?? ""),
      description: String(td[`use_${n}_text`] ?? ""),
    }))
    .filter((c) => c.title);

  // Mappa prodotti correlati
  const relatedProducts: RelatedProduct[] = relatedRaw.map((p) => ({
    slug: p.productSlug,
    name: p.productName,
    description: p.shortProductDescription ?? "",
    price: formatPrice(Number(p.price) * 100),
    imageSrc: p.primaryImageUrl ?? "",
    imageAlt: p.primaryImageAlt ?? p.productName,
  }));

  const firstVariant = product.variants[0];

  return (
    <>
      <main className="navbar-offset pd-page">
        <div className="pd-inner">
          <div className="pd-left">
            <p className="eyebrow pd-eyebrow">{product.eyebrow}</p>
            <h1 className="pd-title">{product.name}</h1>
            {product.rating && (
              <StarRating
                score={product.rating.score}
                count={product.rating.count}
              />
            )}
            <p className="body-text pd-description">{product.description}</p>
            {/* Galleria */}
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
            {product.tags.length > 0 && (
              <div className="pd-tags">
                {product.tags.map((tag) => (
                  <span key={tag.label} className="pd-tag">
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="pd-right">
            <PricingBlock product={product} />
          </div>
        </div>
      </main>

      {whyCards.length > 0 && <ProductWhySection cards={whyCards} />}
      {howItems.length > 0 && (
        <ProductHowSection
          items={howItems}
          imageSrc="/hamburger-microgreens.jpg"
          imageAlt={product.name}
        />
      )}
      {firstVariant && (
        <ProductInfoSection
          variant={firstVariant}
          technicalDetails={td}
          delivery={product.delivery}
        />
      )}
      <ProductPairingsSection products={relatedProducts} />
    </>
  );
}
