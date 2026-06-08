import type { ReactNode } from "react";
import { DashboardNavbar } from "@/components/b2b/DashboardNavbar";

export default function B2BDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DashboardNavbar
        cartCount={0}
        userName="Ristorante Demo"
        userInitials="RD"
      />
      {children}
    </>
  );
}
