"use client";

import { useAuthStore } from "@/types/store/authStore";
import { useEffect } from "react";
import type { UserRole } from "@/types/product-types";

export function AuthHydrator() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) return;

    try {
      const user = JSON.parse(userRaw);
      setAuth({
        token,
        userId: user.userId,
        email: user.email,
        accountType: (user.accountType?.toLowerCase() as UserRole) ?? "guest",
        b2bStatus: user.b2bStatus ?? null,
        companyName: user.companyName ?? null,
      });
    } catch {}
  }, []);
  return null;
}
