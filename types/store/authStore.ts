import { create } from "zustand";

export type UserRole = "guest" | "b2b" | "b2c" | "admin";
export type AuthState = {
  token: string | null;
  userId: string | null;
  email: string | null;
  accountType: UserRole;
  b2bStatus: string | null;
  companyName: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: {
    token: string;
    userId: string;
    email: string;
    accountType: UserRole;
    b2bStatus: string | null;
    companyName?: string | null;
  }) => void;
  setCompanyName: (name: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  email: null,
  accountType: "guest",
  b2bStatus: null,
  companyName: null,
  isAuthenticated: false,

  setAuth: ({ token, userId, email, accountType, b2bStatus, companyName }) => {
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ userId, email, accountType, b2bStatus, companyName }),
    );
    set({
      token,
      userId,
      email,
      accountType,
      b2bStatus,
      companyName: companyName ?? null,
      isAuthenticated: true,
    });
  },

  setCompanyName: (name) => set({ companyName: name }),

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      token: null,
      userId: null,
      email: null,
      accountType: "guest",
      b2bStatus: null,
      companyName: null,
      isAuthenticated: false,
    });
  },
}));
