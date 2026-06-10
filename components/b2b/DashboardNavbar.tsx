"use client";
import { useShallow } from "zustand/react/shallow";
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
import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/types/store/authStore";

const navigation = [
  { name: "Shop", href: "/products" },
  { name: "Ristoranti (B2B)", href: "/b2b" },
  { name: "Come funziona", href: "/come-funziona" },
  { name: "Chi siamo", href: "/about" },
  { name: "Ricette", href: "/ricette" },
  { name: "Contatti", href: "/contatti" },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, accountType, email, companyName, clearAuth } =
    useAuthStore(
      useShallow((s) => ({
        isAuthenticated: s.isAuthenticated,
        accountType: s.accountType,
        email: s.email,
        companyName: s.companyName,
        clearAuth: s.clearAuth,
      })),
    );

  const displayName = companyName ?? email ?? "Il mio account";
  const initials = displayName
    .split(/[\s@]/)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleLogout() {
    clearAuth();
    router.push("/");
  }

  const dashboardHref =
    accountType === "admin"
      ? "/admin"
      : accountType === "b2b"
        ? "/b2b/dashboard"
        : "/home";

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
              href="/"
              className="flex shrink-0 items-center gap-2.5"
              aria-label="Lanzi Orto Urbano"
            >
              <Image
                alt="Lanzi Orto Urbano logo"
                src="/Logo-Lanzi-Orto_Urbano-small.png"
                width={230}
                height={230}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* CENTER — Nav links desktop */}
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

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                /* ── LOGGATO ── */
                <>
                  {/* Avatar dropdown desktop */}
                  <Menu as="div" className="relative hidden sm:block">
                    <MenuButton className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-black/5 transition-colors">
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-(--color-brand-dark) text-xs font-semibold text-white">
                        {initials}
                      </span>
                      <ChevronDown
                        size={14}
                        className="text-(--color-brand-muted)"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl bg-white border border-(--color-brand-border) shadow-lg py-1 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="px-4 py-2.5 border-b border-(--color-brand-border)">
                        <p className="text-xs text-(--color-brand-muted)">
                          Accesso come
                        </p>
                        <p className="text-sm font-semibold text-(--color-brand-black) truncate">
                          {displayName}
                        </p>
                      </div>
                      <MenuItem>
                        <Link
                          href={dashboardHref}
                          className="block px-4 py-2 text-sm text-(--color-brand-text) hover:bg-black/5"
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/ordini"
                          className="block px-4 py-2 text-sm text-(--color-brand-text) hover:bg-black/5"
                        >
                          I miei ordini
                        </Link>
                      </MenuItem>
                      <div className="border-t border-(--color-brand-border) mt-1">
                        <MenuItem>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Esci
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </>
              ) : (
                /* ── NON LOGGATO ── */
                <Link
                  href="/login"
                  className="btn btn-brand hidden sm:inline-flex"
                  style={{
                    height: "38px",
                    fontSize: "0.78rem",
                    paddingInline: "18px",
                  }}
                >
                  ACCEDI | REGISTRATI
                </Link>
              )}

              {/* Burger mobile */}
              <DisclosureButton className="sm:hidden group relative inline-flex items-center justify-center rounded-md p-2 text-(--color-brand-muted) hover:bg-black/5">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Apri menu</span>
                <Bars3Icon className="block size-6 group-data-open:hidden" />
                <XMarkIcon className="hidden size-6 group-data-open:block" />
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
                    className={[
                      "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-(--color-brand-dark) text-white"
                        : "text-(--color-brand-text) hover:bg-black/5",
                    ].join(" ")}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}

              <div className="pt-2 pb-1 border-t border-(--color-brand-border) mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-(--color-brand-text)">
                      {displayName}
                    </div>
                    <DisclosureButton
                      as={Link}
                      href={dashboardHref}
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-(--color-brand-text) hover:bg-black/5"
                    >
                      Dashboard
                    </DisclosureButton>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left rounded-md px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Esci
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="btn btn-brand w-full">
                    ACCEDI/REGISTRATI
                  </Link>
                )}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
