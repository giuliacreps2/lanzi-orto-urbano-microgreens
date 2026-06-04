import { apiRequest } from "./client";
import type { LabelDTO } from "@/types/label";

export async function getLabelsByOrderId(
  orderId: string,
  accessToken?: string | null,
) {
  return apiRequest<LabelDTO[]>(`/labels/order/${orderId}`, {
    method: "GET",
    accessToken,
  });
}

export async function generateLabelsByOrderId(
  orderId: string,
  accessToken?: string | null,
) {
  return apiRequest<LabelDTO[]>(`/labels/order/${orderId}/generate`, {
    method: "POST",
    accessToken,
  });
}

export function getLabelImageUrl(labelId: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/labels/${labelId}/label`;
}
