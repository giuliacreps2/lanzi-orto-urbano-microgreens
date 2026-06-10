import { BellIcon, MenuIcon, SearchIcon } from "lucide-react";
import { AvatarButton } from "@/components/ui/avatar";
import Image from "next/image";

type AdminTopbarProps = {
  onOpenMobileSidebar: () => void;
};

export default function AdminTopbar({ onOpenMobileSidebar }: AdminTopbarProps) {
  const handleAvatarClick = () => {
    console.log("Avatar cliccato!");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="flex size-10 items-center justify-center rounded-xl bg-white hover:bg-zinc-50 md:hidden"
        >
          <MenuIcon className="size-5 text-zinc-700" />
        </button>

        <div className="relative hidden w-full max-w-md md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />

          <input
            type="search"
            placeholder="Cerca prodotti, ordini, clienti..."
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative flex size-10 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50">
            <BellIcon className="size-5 text-zinc-600" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={handleAvatarClick}
            className="rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ width: "48px", height: "48px" }}
          >
            <Image
              src="/customer-care-man.jpg"
              alt="Avatar dell'utente"
              width={48}
              height={48}
              className="object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
