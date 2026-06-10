import type { ProductDetailDTO } from "@/types/product-api-types";
import type { ProductPageData } from "@/types/product-types";

export function mapProductDetailToPageData(
  dto: ProductDetailDTO,
): ProductPageData {
  return {
    productId: dto.product.productId,
    slug: dto.product.productSlug,
    name: dto.product.productName,
    eyebrow: dto.product.categoryName ?? "Microgreens",
    description: dto.product.productDescription,
    shortDescription: dto.product.shortProductDescription,
    availabilityStatus: dto.product.isAvailable ? "IN_STOCK" : "OUT_OF_STOCK",
    isAvailable: dto.product.isAvailable,
    tags: [],
    variants: (
      (dto as any).variants ??
      ((dto as any).variant ? [(dto as any).variant] : [])
    ).map((v: any) => ({
      variantId: v.variantId,
      skuVariant: v.skuVariant,
      activeVariant: true,
      netWeight: v.netWeight,
      unit: v.unit as ProductPageData["variants"][number]["unit"],
      packagingType: {
        packTypeId: v.packTypeId ?? "",
        namePackType: v.namePackType ?? "Standard",
        unitOfMeasure: v.unitOfMeasure ?? "",
      },
      technicalDetails: v.technicalDetails,
      priceLists: v.priceLists.map((p: any) => ({
        priceListId: crypto.randomUUID(),
        price: Number(p.price) * 100,
        minOrderQuantity: p.minOrderQuantity ?? 1,
        clientCategory: p.clientCategory,
      })),
    })),
    vatRate: 0.04,
    delivery: {
      kind: "harvest",
      expectedHarvest: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    subscriptionFrequencies: ["weekly", "biweekly", "monthly"],
    rating: undefined,
    images:
      dto.images?.map((img) => ({
        src: img.urlImage,
        alt: img.altText,
        isPrimary: img.isPrimary,
      })) ?? [],
  };
}
