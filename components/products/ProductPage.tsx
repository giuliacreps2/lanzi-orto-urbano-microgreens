/**
 * app/prodotti/[slug]/page.tsx
 */

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { Star } from "lucide-react";
import { PricingBlock } from "./PricingBlock";
import type {
  UserRole,
  ProductPageData,
  DeliveryInfo,
} from "@/types/product-types";
import type {
  Product,
  ProductVariant,
  PriceList,
  PackagingType,
} from "@/types/product";

/* ── Costanti IVA per categoria ──────────────────────────
   Finché il backend non espone vatRate esplicitamente,
   lo deriviamo dalla categoria. Da aggiornare quando
   il backend avrà un campo dedicato.
──────────────────────────────────────────────────────── */
const VAT_BY_CATEGORY: Record<string, number> = {
  MICROGREENS: 0.04,
  HONEY: 0.1,
  // aggiungi le altre categorie qui
};

/* ── Auth ─────────────────────────────────────────────── */
async function getUserRole(): Promise<UserRole> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return "guest";

  try {
    // TODO: sostituisci con verifyJwt(token)
    // const payload = verifyJwt(token);
    // return payload.role as UserRole;
    return "guest";
  } catch {
    return "guest";
  }
}

/* ── Raw backend response type ────────────────────────── */
type RawProductResponse = {
  product: Product & {
    productCategory?: Product["productCategory"];
  };
  variants: ProductVariant & {
    packagingType: PackagingType;
  };
  priceLists: PriceList[];
  expectedHarvest?: string; // ISO date — presente solo per microgreens/funghi/fiori
};

/* ── Fetch ────────────────────────────────────────────── */
async function fetchProduct(slug: string): Promise<RawProductResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* ── Mapper: raw → ProductPageData ───────────────────── */
function mapToPageData(raw: RawProductResponse): ProductPageData {
  const categoryCode =
    raw.product.productCategory?.metadataProdCategory?.category;
  const vatRate = VAT_BY_CATEGORY[categoryCode ?? ""] ?? 0.04;

  // Tipo consegna derivato dalla categoria
  const delivery: DeliveryInfo = raw.expectedHarvest
    ? { kind: "harvest", expectedHarvest: raw.expectedHarvest }
    : { kind: "stock", leadTimeHours: 48 };

  // Tag da technicalDetails della variante
  const tags = raw.variants.technicalDetails
    ? Object.entries(raw.variants.technicalDetails)
        .filter(([, v]) => typeof v === "string" && v.length < 30)
        .map(([, v]) => ({ label: String(v) }))
    : [];

  return {
    productId: raw.product.productId,
    slug: raw.product.productSlug,
    name: raw.product.productName,
    description: raw.product.productDescription,
    shortDescription: raw.product.shortProductDescription,
    availabilityStatus: raw.product.availabilityStatus,
    isAvailable: raw.product.productIsAvailable,
    eyebrow: raw.product.productCategory?.nameProdCategory ?? "",
    images: [], // TODO: collegare bucket immagini
    tags,
    variant: raw.variants,
    priceLists: raw.priceLists,
    vatRate,
    delivery,
    subscriptionFrequencies:
      categoryCode === "MICROGREENS"
        ? ["weekly", "biweekly", "monthly"]
        : undefined,
  };
}

/* ── Star rating ──────────────────────────────────────── */
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
      <span className="pd-rating-count">({count} Recensioni)</span>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [raw, role] = await Promise.all([fetchProduct(slug), getUserRole()]);

  if (!raw) notFound();

  const product = mapToPageData(raw);

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
              {product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="pd-gallery-placeholder" />
              )}
            </div>

            {product.images.length > 1 && (
              <div className="pd-gallery-thumbs">
                {product.images.slice(1).map((img, i) => (
                  <div key={i} className="pd-gallery-thumb">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tag */}
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

        {/* ── Colonna destra: pricing sticky ── */}
        <div className="pd-right">
          <PricingBlock product={product} role={role} />
        </div>
      </div>
    </main>
  );
}
