"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/dashboard" },
  { name: "Shop", href: "/shop" },
  { name: "Ordini", href: "/dashboard/ordini" },
  { name: "Ispirazione", href: "/dashboard/ispirazione" },
];

type DashboardNavbarProps = {
  cartCount?: number;
  userName?: string;
  userInitials?: string;
};

export function DashboardNavbar({
  cartCount = 0,
  userName = "Ristorante Demo",
  userInitials = "RD",
}: DashboardNavbarProps) {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 inset-x-0 z-50 h-16 bg-(--background) border-b border-(--color-brand-border)"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* LEFT — Brand */}
            <Link
              href="/dashboard"
              className="flex shrink-0 items-center gap-2.5"
              aria-label="Lanzi Orto Urbano — dashboard"
            >
              <Image
                alt="Lanzi Orto Urbano logo"
                src=""
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

            {/* RIGHT — Carrello + Avatar */}
            <div className="flex items-center gap-3">
              {/* Carrello */}
              <Link
                href="/dashboard/carrello"
                className="relative flex items-center justify-center w-9 h-9 rounded-md text-(--color-brand-text) hover:text-(--color-brand-dark) hover:bg-black/5 transition-colors"
                aria-label={`Carrello${cartCount > 0 ? `, ${cartCount} articoli` : ""}`}
              >
                <ShoppingCart size={20} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="db-cart-badge">{cartCount}</span>
                )}
              </Link>

              {/* Avatar con dropdown */}
              <Menu as="div" className="relative hidden sm:block">
                <MenuButton className="db-avatar-btn">
                  <span className="db-avatar-initials">{userInitials}</span>
                  <span className="text-sm font-medium text-(--color-brand-text) max-w-32 truncate">
                    {userName}
                  </span>
                  <ChevronDown
                    size={14}
                    className="text-(--color-brand-muted)"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-[var(--radius-md)] bg-white border border-(--color-brand-border) shadow-lg py-1 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="px-4 py-2.5 border-b border-(--color-brand-border)">
                    <p className="text-xs text-(--color-brand-muted)">
                      Accesso come
                    </p>
                    <p className="text-sm font-semibold text-(--color-brand-black) truncate">
                      {userName}
                    </p>
                  </div>
                  <MenuItem>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-(--color-brand-text) hover:bg-black/5 data-focus:bg-black/5"
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/dashboard/ordini"
                      className="block px-4 py-2 text-sm text-(--color-brand-text) hover:bg-black/5 data-focus:bg-black/5"
                    >
                      I miei ordini
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/dashboard/impostazioni"
                      className="block px-4 py-2 text-sm text-(--color-brand-text) hover:bg-black/5 data-focus:bg-black/5"
                    >
                      Impostazioni
                    </Link>
                  </MenuItem>
                  <div className="border-t border-(--color-brand-border) mt-1">
                    <MenuItem>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 data-focus:bg-red-50">
                        Esci
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

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
              <div className="pt-3 pb-1 border-t border-(--color-brand-border) mt-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <span className="db-avatar-initials">{userInitials}</span>
                  <span className="text-sm font-medium text-(--color-brand-text)">
                    {userName}
                  </span>
                </div>
                <Link
                  href="/dashboard/impostazioni"
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-(--color-brand-text) hover:bg-black/5"
                >
                  Impostazioni
                </Link>
                <button className="block w-full text-left rounded-md px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50">
                  Esci
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
