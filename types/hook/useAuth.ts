"use client";
import { useAuthStore } from "../store/authStore";
import { useShallow } from "zustand/react/shallow";

export function useAuth() {
  return useAuthStore(
    useShallow((s) => ({
      token: s.token,
      accountType: s.accountType,
      b2bStatus: s.b2bStatus,
      isAuthenticated: s.isAuthenticated,
      email: s.email,
    })),
  );
}
