import { Unit } from "./product";

export type ProductCatalogDTO = {
  productId: string;
  variantId: string;
  productName: string;
  productSlug: string;
  shortProductDescription: string;
  skuVariant: string;
  netWeight: number;
  unit: string;
  price: number;
  clientCategory: "B2B" | "B2C";
  priceLabel: string;
  minOrderQuantity: number;
  productIsAvailable: boolean;
  activeVariant: boolean;
};
