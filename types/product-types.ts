import type {
  Product,
  ProductVariant,
  PackagingType,
  PriceList,
  ClientCategory,
} from "@/types/product";

/* ── Ruolo utente (frontend-only) ───────────────────── */
export type UserRole = "guest" | "b2c" | "b2b";

/* ── Frequenza subscription (frontend-only) ─────────── */
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";

export const subscriptionLabels: Record<SubscriptionFrequency, string> = {
  weekly: "Ogni settimana",
  biweekly: "Ogni due settimane",
  monthly: "Ogni mese",
};

/**
 * Tipo consegna — derivato da productCategory.metadataProdCategory.
 * - "harvest": microgreens, fiori eduli, funghi → hanno expectedHarvest
 * - "stock":   miele → spedizione entro N ore dalla disponibilità
 */
export type DeliveryInfo =
  | { kind: "harvest"; expectedHarvest: string } // ISO date
  | { kind: "stock"; leadTimeHours: number };

export type PriceEntry = {
  priceListId: string;
  price: number;
  minOrderQuantity: number;
  clientCategory: ClientCategory;
};

export type PackagingInfo = {
  packTypeId: string;
  namePackType: string;
  unitoOfMeasure: string;
};

export type VariantData = {
  variantId: string;
  skuVariant: string;
  activeVariant: boolean;
  netWeight: number;
  unit: "GRAMS" | "KG" | "TRAY" | "JAR" | string;
  packagingType: PackagingInfo;
  technicalDetails: Record<string, unknown>;
  priceLists: PriceEntry[];
};

export type ProductPageData = {
  productId: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  availabilityStatus: Product["availabilityStatus"];
  isAvailable: boolean;

  eyebrow: string;

  /** Immagini (gestite separatamente, non nel backend attuale) */
  images: { src: string; alt: string }[];

  /** Tag derivati da technicalDetails della variante */
  tags: { label: string }[];

  /** Variante attiva */
  variants: VariantData[];

  /**
   * IVA applicabile (es. 0.04 = 4%).
   * Derivata da productCategory o da un campo fisso per categoria.
   * Il backend non la espone ancora esplicitamente: va letta
   * da technicalDetails o hardcodata per categoria finché non
   * viene aggiunto al backend.
   */
  vatRate: number;

  /** Info consegna derivata dalla categoria */
  delivery: DeliveryInfo;

  /** Solo B2B */
  subscriptionFrequencies?: SubscriptionFrequency[];

  /** Recensioni (gestite separatamente) */
  rating?: { score: number; count: number } | null;
};

/* ── Helper: estrai i prezzi dal listino ────────────── */

export function getPriceForRole(
  priceLists: PriceEntry[],
  clientCategory: ClientCategory,
): PriceList | undefined {
  return priceLists.find((p) => p.clientCategory === clientCategory);
}

export function getMinOrder(
  priceLists: PriceEntry[],
  clientCategory: ClientCategory,
): number {
  return getPriceForRole(priceLists, clientCategory)?.minOrderQuantity ?? 1;
}

export type WhyCard = {
  title: string;
  description: string;
};

export type HowItem = {
  title: string;
  description: string;
};

export type RelatedProduct = {
  slug: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};
