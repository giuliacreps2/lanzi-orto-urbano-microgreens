import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";
import { DashboardNavbar } from "@/components/b2b/DashboardNavbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNavbar />
      {children}
      <Footer />
    </>
  );
}
