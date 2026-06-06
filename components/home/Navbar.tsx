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
  { name: "Shop", href: "/" },
  { name: "Ristoranti(B2B)", href: "/b2b" },
  { name: "Come funziona", href: "/team" },
  { name: "Chi siamo", href: "/about" },
  { name: "Ricette", href: "/ricette" },
  { name: "Contatti", href: "/contatti" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="relative bg-(--background)) after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* LEFT — Brand */}
              <div className="flex shrink-0 items-center gap-2">
                <Image
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-white font-semibold text-lg tracking-tight">
                  Lanzi Orto Urbano
                </span>
              </div>

              {/* CENTER — Nav links (desktop only) */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        isActive
                          ? "bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium"
                          : "text-(--color-primary-green) hover:bg-white/5 hover:text-(--color-brand-dark) rounded-md px-3 py-2 text-sm font-medium"
                      }
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* RIGHT — Login button + burger */}
              <div className="flex items-center gap-2">
                {/* Login button (always visible) */}
                <Link
                  href="/login"
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-colors"
                >
                  Login
                </Link>

                {/* Burger (mobile only) */}
                <DisclosureButton className="sm:hidden group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
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
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "bg-gray-950/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        : "text-gray-300 hover:bg-white/5 hover:text-(--color-brand-dark) block rounded-md px-3 py-2 text-base font-medium"
                    }
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
