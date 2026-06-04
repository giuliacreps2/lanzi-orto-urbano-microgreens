import { apiRequest } from "./client";
import type { ClientCategory, PriceList } from "@/types/product";

export type CreatePriceListPayload = {
  price: number;
  minOrderQuantity?: number;
  clientCategory: ClientCategory;
  productVariantId: string;
};

export async function createPriceList(
  payload: CreatePriceListPayload,
  accessToken?: string | null,
) {
  return apiRequest<PriceList>("/price-list/new-prz", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}
