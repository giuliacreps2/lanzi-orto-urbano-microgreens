import { apiRequest } from "./client";
import type { PackagingType } from "@/types/product";

export async function getPackagingType(token?: string | null) {
  return apiRequest<PackagingType[]>("/packaging", {
    method: "GET",
    token,
  });
}
