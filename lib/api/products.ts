import { apiRequest } from "./client";
import {
  type AvailabilityStatus,
  type Product,
  type ProductStatus,
  type CompositeProductFormPayload,
  ProductDetailResponse,
} from "@/types/product";

export type CreateProductPayload = {
  productName: string;
  productSlug: string;
  productDescription: string;
  shortProductDescription: string;
  availabilityStatus: AvailabilityStatus;
  productIsAvailable: boolean;
  productStatus: ProductStatus;
  productCategoryId: string;
};

export async function createCompositeProduct(
  payload: CompositeProductFormPayload,
  accessToken?: string | null,
) {
  return apiRequest<Product>("/products/new-composite", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}

export async function updateCompositeProduct(
  productId: string,
  payload: CompositeProductFormPayload,
  accessToken?: string | null,
) {
  return apiRequest<Product>(`/products/composite/${productId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    accessToken,
  });
}

export async function getProductDetailBySlug(
  slug: string,
  accessToken?: string | null,
) {
  return apiRequest<ProductDetailResponse>(`/products/${slug}/detail`, {
    method: "GET",
    accessToken,
  });
}

{
  /*export async function createProduct(
  payload: CreateProductPayload,
  token?: string | null,
) {
  return apiRequest<Product>("/product/new-prod", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}*/
}

export async function createProduct(
  payload: CreateProductPayload,
  accessToken?: string | null,
) {
  const activeToken =
    accessToken ||
    (typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null);

  console.log("TOKEN PASSATO COME ARGOMENTO:", accessToken);
  console.log("TOKEN COMPLESSIVO INDIVIDUATO:", activeToken);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (activeToken) {
    headers["Authorization"] = `Bearer ${activeToken}`;
  } else {
    console.warn(
      "ATTENZIONE: Nessun token trovato! La richiesta partirà senza Authorization header.",
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/new-prod`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const errorHtml = await res.text();
    console.error("RISPOSTA HTML DEL SERVER:", errorHtml);
    throw new Error(`Errore del server: ${res.status}`);
  }

  const productData: Product = await res.json();
  return productData;
}

export async function getProducts(accessToken?: string | null) {
  return apiRequest<Product[]>("/products", {
    method: "GET",
    accessToken,
  });
}
