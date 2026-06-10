import { ProductPageData } from "./product-types";

export type ProductInfoDTO = {
  productId: string;
  productName: string;
  productSlug: string;
  productDescription: string;
  shortProductDescription: string;
  isAvailable: boolean;
  categoryName: string | null;
};

export type VariantInfoDTO = {
  variantId: string;
  skuVariant: string;
  netWeight: number;
  unit: string;
  technicalDetails: Record<string, unknown>;
  packTypeId: string | null;
  namePackType: string | null;
  unitOfMeasure: string | null;
  priceLists: PriceInfoDTO[];
};

export type PriceInfoDTO = {
  price: number;
  minOrderQuantity: number | null;
  clientCategory: "B2B" | "B2C";
};

export type ProductImageDTO = {
  urlImage: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
};

export type ProductDetailDTO = {
  product: ProductInfoDTO;
  variant: VariantInfoDTO[];
  images: ProductImageDTO[];
};
