import {
  ArchiveBoxIcon,
  Cog6ToothIcon,
  CubeIcon,
  InboxStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import {
  BanknoteIcon,
  HomeIcon,
  ShoppingBagIcon,
  TicketIcon,
  UsersIcon,
} from "lucide-react";
import { title } from "process";

export const adminNavigation = [
  {
    title: "Vendite",
    items: [
      {
        label: "Ordini",
        href: "/admin/orders",
        icon: ShoppingBagIcon,
      },
      {
        label: "Clienti",
        href: "/admin/customers",
        icon: UserGroupIcon,
      },
    ],
  },
  {
    title: "Catalogo",
    items: [
      {
        label: "Prodotti",
        href: "/admin/products",
        icon: CubeIcon,
      },
      {
        label: "Categorie",
        href: "/admin/categories",
        icon: Squares2X2Icon,
      },
      {
        label: "Listini prezzi",
        href: "/admin/price-lists",
        icon: BanknoteIcon,
      },
    ],
  },
  {
    title: "Produzione",
    items: [
      {
        label: "Lotti",
        href: "/admin/batches",
        icon: ArchiveBoxIcon,
      },
      {
        label: "Etichette",
        href: "/admin/labels",
        icon: TicketIcon,
      },
      {
        label: "Packaging",
        href: "/admin/packaging",
        icon: InboxStackIcon,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        label: "Utenti",
        href: "/admin/users",
        icon: UsersIcon,
      },
      {
        label: "Impostazioni",
        href: "/admin/settings",
        icon: Cog6ToothIcon,
      },
    ],
  },
];

export const adminMainNavigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: HomeIcon,
  },
];
