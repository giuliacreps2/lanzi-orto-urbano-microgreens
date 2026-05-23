import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductsTable, {
  type AdminProduct,
} from "@/components/admin/ProductsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const mockProducts: AdminProduct[] = [
  {
    id: "PRD-001",
    name: "Microgreens di Ravanello",
    category: "Microgreens",
    status: "Attivo",
    stock: 32,
    price: "€4,50",
  },
  {
    id: "PRD-002",
    name: "Microgreens di Pisello",
    category: "Microgreens",
    status: "Attivo",
    stock: 18,
    price: "€4,80",
  },
  {
    id: "PRD-003",
    name: "Mix Chef",
    category: "Microgreens",
    status: "Bozza",
    stock: 0,
    price: "€6,90",
  },
  {
    id: "PRD-004",
    name: "Girasole",
    category: "Microgreens",
    status: "Archiviato",
    stock: 0,
    price: "€5,20",
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Prodotti"
        description="Gestisci catalogo, categorie, varianti, immagini e disponibilità."
        action={
          <Button href="/admin/products/new" variant="admin">
            <PlusIcon className="size-4" />
            Nuovo Prodotto
          </Button>
        }
      />

      <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Cerca prodotto..."
            className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white sm:w-80"
          />

          <div className="flex-gap-2">
            <Button variant="adminOutline">Filtra</Button>
            <Button variant="adminOutline">Ordina</Button>
          </div>
        </div>

        <div className="p-4">
          <ProductsTable products={mockProducts} />
        </div>
      </section>
    </div>
  );
}
