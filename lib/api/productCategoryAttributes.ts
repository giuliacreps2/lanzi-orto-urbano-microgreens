import { CreateProductCategoryPayload } from "./categories";
import { apiRequest } from "./client";
import type {
  AttributeType,
  ProductCategoryAttribute,
  Unit,
} from "@/types/product";

export type createProductCategoryAttributePayload = {
  prodCatAttributeKey: string;
  prodCatAttributeLabel: string;
  attrType: AttributeType;
  required: boolean;
  defaultValue?: string | null;
  minValue?: string | null;
  maxValue?: string | null;
  unit?: Unit | null;
  productCategoryId: string;
};

export async function getAttributesByCategory(
  productCategoryId: string,
  token?: string | null,
) {
  return apiRequest<ProductCategoryAttribute[]>(
    `/attributes/category/${productCategoryId}`,
    {
      method: "GET",
      token,
    },
  );
}

export async function createProductCategoryAttribute(
  payload: CreateProductCategoryPayload,
  token?: string | null,
) {
  return apiRequest<ProductCategoryAttribute>("/attributes/new-attr", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}
