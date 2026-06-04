import { apiRequest } from "./client";
import type {
  AttributeType,
  ProductCategoryAttribute,
  Unit,
} from "@/types/product";

export type CreateProductCategoryAttributePayload = {
  prodCatAttributeKey: string;
  prodCatAttributeLabel: string;
  attrType: AttributeType;
  required: boolean;
  defaultValue?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  unit?: Unit | null;
  productCategoryId: string;
};

export async function getAttributesByCategory(
  productCategoryId: string,
  accessToken?: string | null,
) {
  return apiRequest<ProductCategoryAttribute[]>(
    `/attributes/category/${productCategoryId}`,
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function createProductCategoryAttribute(
  payload: CreateProductCategoryAttributePayload,
  accessToken?: string | null,
) {
  return apiRequest<ProductCategoryAttribute>("/attributes/new-attr", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}
