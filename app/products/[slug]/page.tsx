/**
 * app/products/[slug]/page.tsx
 * Versione STATICA per sviluppo UI — nessuna fetch
 * Sostituire con la versione con fetch quando il backend è pronto
 */

import Image from "next/image";
import { Star } from "lucide-react";
import { PricingBlock } from "@/components/products/PricingBlock";
import type { ProductPageData } from "@/types/product-types";

/* ── Dati statici ────────────────────────────────────── */
const MOCK_PRODUCT: ProductPageData = {
  productId: "mock-001",
  slug: "microgreen-senape-wasabi",
  name: "Microgreens Senape Wasabi",
  eyebrow: "Microgreens · Piccante",
  description:
    "Una nota piccante e decisa per le vostre creazioni culinarie. Coltivata in ambiente controllato per garantire standard qualitativi costanti tutto l'anno per cucine gourmet.",
  shortDescription: "Microgreens piccanti, ideali per piatti signature.",
  availabilityStatus: "IN_STOCK",
  isAvailable: true,
  images: [],
  tags: [{ label: "Piccante" }, { label: "Biologico" }, { label: "Km0" }],
  variant: {
    variantId: "var-001",
    skuVariant: "MIC-SEN-WAS-50",
    activeVariant: true,
    netWeight: 50,
    unit: "GRAMS",
    packagingType: {
      packTypeId: "pack-001",
      namePackType: "Vaschetta Standard",
      unitOfMeasure: "TRAY",
    },
    technicalDeatils: {
      taste_notes: "piccante, fresco, pungente",
      intensity: "3/5",
      storage: "Conservare in frigo tra 2°C e 6°C",
      shelf_life_days: "5",
    },
  },
  priceLists: [
    {
      priceListId: "price-b2c",
      price: 345,
      clientCategory: "B2C",
    },
    {
      priceListId: "price-b2b",
      price: 290,
      minOrderQuantity: 10,
      clientCategory: "B2B",
    },
  ],
  vatRate: 0.04,
  delivery: {
    kind: "harvest",
    expectedHarvest: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  },
  subscriptionFrequencies: ["weekly", "biweekly", "monthly"],
  rating: { score: 5, count: 48 },
};

/* ── StarRating ──────────────────────────────────────── */
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

/* ── Page ────────────────────────────────────────────── */
export default function ProductPage() {
  const product = MOCK_PRODUCT;

  return (
    <main className="navbar-offset pd-page">
      <div className="pd-inner">
        {/* ── Colonna sinistra ── */}
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

          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery-main">
              <div className="pd-gallery-placeholder" />
            </div>
            <div className="pd-gallery-thumbs">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="pd-gallery-thumb" />
              ))}
            </div>
          </div>

          {/* Tag */}
          <div className="pd-tags">
            {product.tags.map((tag) => (
              <span key={tag.label} className="pd-tag">
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Colonna destra sticky ── */}
        <div className="pd-right">
          <PricingBlock product={product} role="guest" />
        </div>
      </div>
    </main>
  );
}
