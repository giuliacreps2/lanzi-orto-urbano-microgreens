import { apiRequest } from "./client";
import type {
  AvailabilityStatus,
  Product,
  ProductStatus,
} from "@/types/product";

export type CreateProductPayload = {
  productName: string;
  productSlug: string;
  productDescripption: string;
  shortProductDescription: string;
  availabilityStatus: AvailabilityStatus;
  productIsAvailable: boolean;
  productStatus: ProductStatus;
  productCategoryId: string;
};

export async function createProduct(
  payload: CreateProductPayload,
  token?: string | null,
) {
  return apiRequest<Product>("/product/new-prod", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export async function getProducts(token?: string | null) {
  return apiRequest<Product[]>("/products", {
    method: "GET",
    token,
  });
}
