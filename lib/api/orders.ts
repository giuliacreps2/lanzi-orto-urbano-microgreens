import { apiRequest } from "./client";
import type { AdminOrderDetailDTO, AdminOrderRowDTO } from "@/types/order";

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export async function getAdminOrders(accessToken?: string | null) {
  return apiRequest<PageResponse<AdminOrderRowDTO>>("/orders", {
    method: "GET",
    accessToken,
  });
}

export async function getAdminOrderDetail(
  orderId: string,
  accessToken?: string | null,
) {
  return apiRequest<AdminOrderDetailDTO>(`/orders/${orderId}/detail`, {
    method: "GET",
    accessToken,
  });
}
