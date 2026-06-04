import { apiRequest } from "./client";
import type { PackagingType } from "@/types/product";

export async function getPackagingType(accessToken?: string | null) {
  return apiRequest<PackagingType[]>("/packaging", {
    method: "GET",
    accessToken,
  });
}
