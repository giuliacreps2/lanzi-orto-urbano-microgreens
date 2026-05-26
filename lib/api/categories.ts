import { apiRequest } from "./client";
import type { ProductCategory, ProductCategoryMetadata } from "@/types/product";

export type CreateProductCategoryPayload = {
  nameProdCategory: string;
  requiresBatchTracking: boolean;
  metadataProdCategory?: ProductCategoryMetadata;
};

export async function getProductCategories(token?: string | null) {
  return apiRequest<ProductCategory[]>("/categories", {
    method: "GET",
    token,
  });
}

export async function createProductCategory(
  payload: CreateProductCategoryPayload,
  token?: string | null,
) {
  return apiRequest<ProductCategory>("/categories/new-cat", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}
