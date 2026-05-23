"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUpIcon, Sidebar, XIcon } from "lucide-react";

import { adminMainNavigation, adminNavigation } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

type AdminSidebarProps = {
  isMobileSidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
};

export default function AdminSidebar({
  isMobileSidebarOpen,
  onCloseMobileSidebar,
}: AdminSidebarProps) {
  return (
    <>
      <DesktopSidebar />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={onCloseMobileSidebar}
      />
    </>
  );
}

function DesktopSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-800 bg-zinc-950 text-white md:flex md:flex-col">
      <SidebarContent />
    </aside>
  );
}

function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-r bg-zinc-950 border-zinc-800 text-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
          <div>
            <p className="text-sm font-semibold tracking-tight">Lanzi Admin</p>
            <p className="mt-1 text-xs text-zinc-400">Backoffice</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl hover:bg-zinc-900"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <SidebarNavigation onNavigate={onClose} />

        <SidebarFooter />
      </aside>
    </div>
  );
}

function SidebarContent() {
  return (
    <>
      <div className="border-b border-zinc-800 px-5 py-5">
        <p className="text-sm font-semibold tracking-tight">Lanzi Admin</p>
        <p className="mt-1 text-xs text-zinc-400">Backoffice</p>
      </div>

      <SidebarNavigation />

      <SidebarFooter />
    </>
  );
}

function SidebarNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <div className="mb-5 space-y-1">
        {adminMainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-white text-zinc-950"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-6">
        {adminNavigation.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-white text-zinc-950"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white",
                    )}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-zinc-800 p-3">
      <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-zinc-900">
        <span className="flex min-w-0 items-center gap-3">
          <Avatar
            square
            initials="A"
            className="size-9 bg-zinc-800 text-white"
          />

          <span className="min-w-0">
            <span className="block truncate font-medium">Admin</span>
            <span className="block truncate text-xs text-zinc-400">
              Lanzi Orto Urbano
            </span>
          </span>
        </span>

        <ChevronUpIcon className="size-4 text-zinc-400" />
      </button>
    </div>
  );
}
