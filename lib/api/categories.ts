import { apiRequest } from "./client";
import type { ProductCategory, ProductCategoryMetadata } from "@/types/product";

export type CreateProductCategoryPayload = {
  nameProdCategory: string;
  requiresBatchTracking: boolean;
  metadataProdCategory?: ProductCategoryMetadata;
};

export async function getProductCategories(accessToken?: string | null) {
  return apiRequest<ProductCategory[] | { content?: ProductCategory[] }>(
    "/categories",
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function createProductCategory(
  payload: CreateProductCategoryPayload,
  accessToken?: string | null,
) {
  return apiRequest<ProductCategory>("/product-categories/new-cat", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}
