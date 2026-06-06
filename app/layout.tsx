import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lanzi Orto Urbano — Microgreens freschi coltivati in città",
  description:
    "Microgreens, miele e fiori eduli coltivati in ambiente controllato. Consegne B2B e B2C in tutta Italia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={plusJakarta.variable}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
