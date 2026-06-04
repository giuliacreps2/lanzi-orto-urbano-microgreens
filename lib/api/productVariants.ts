import { apiRequest } from "./client";
import type { ProductVariant, TechnicalDetails, Unit } from "@/types/product";

export type CreteProductVariantPayload = {
  skuVariant: string;
  activeVariant: boolean;
  netWeight: number;
  unit: Unit;
  productId: string;
  packTypeId: string;
  technicalDetails?: TechnicalDetails;
};

export async function createProductVariant(
  payload: CreteProductVariantPayload,
  accessToken?: string | null,
) {
  return apiRequest<ProductVariant>("/variants/new-var", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}
