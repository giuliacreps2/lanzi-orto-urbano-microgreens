"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Ristoranti (B2B)", href: "/b2b" },
  { name: "Come funziona", href: "/come-funziona" },
  { name: "Chi siamo", href: "/about" },
  { name: "Ricette", href: "/ricette" },
  { name: "Contatti", href: "/contatti" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      // h-16 = 64px — corrisponde a --navbar-height in globals.css
      className="fixed top-0 inset-x-0 z-50 h-16 bg-(--background) border-b border-(--color-brand-border)"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* LEFT — Brand */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5"
              aria-label="Lanzi Orto Urbano — home"
            >
              <Image
                alt="Lanzi Orto Urbano logo"
                src="/logo.svg" /* ← sostituisci col tuo path */
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* CENTER — Nav links (desktop) */}
            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-(--color-brand-dark) text-white"
                        : "text-(--color-brand-text) hover:text-(--color-brand-dark) hover:bg-black/5",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT — CTA + burger */}
            <div className="flex items-center gap-2">
              {/* CTA sempre visibile */}
              <Link
                href="/shop"
                className="btn btn-brand hidden sm:inline-flex"
                style={{
                  height: "38px",
                  fontSize: "0.78rem",
                  paddingInline: "18px",
                }}
              >
                ACCEDI | REGISTRATI
              </Link>

              {/* Burger — solo mobile */}
              <DisclosureButton className="sm:hidden group relative inline-flex items-center justify-center rounded-md p-2 text-(--color-brand-muted) hover:bg-black/5 hover:text-(--color-brand-dark) focus:outline-2 focus:-outline-offset-1 focus:outline-(--color-brand-green)">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Apri menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden border-t border-(--color-brand-border) bg-(--background)">
            <div className="space-y-1 px-3 py-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-(--color-brand-dark) text-white"
                        : "text-(--color-brand-text) hover:bg-black/5 hover:text-(--color-brand-dark)",
                    ].join(" ")}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}

              {/* CTA mobile */}
              <div className="pt-2 pb-1">
                <Link href="/shop" className="btn btn-brand w-full">
                  ACCEDI/REGISTRATI
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
