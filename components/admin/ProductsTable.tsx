import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { MoreHorizontalIcon } from "lucide-react";

type ProductStatus = "Attivo" | "Bozza" | "Archiviato";

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  status: "Attivo" | "Bozza" | "Archiviato";
  stock: number;
  price: string;
  previewImageUrl?: string;
};

type ProductsTableProps = {
  products: AdminProduct[];
};

function getStatusClass(status: AdminProduct["status"]) {
  switch (status) {
    case "Attivo":
      return "bg-green-100 text-green-700";
    case "Bozza":
      return "bg-yellow-100 text-yellow-800";
    case "Archiviato":
      return "bg-zinc-100 text-zinc-600";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Prodotto</TableHeader>
          <TableHeader>Categoria</TableHeader>
          <TableHeader>Stato</TableHeader>
          <TableHeader>Stock</TableHeader>
          <TableHeader>Prezzo</TableHeader>
          <TableHeader className="text-righ">Azioni</TableHeader>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar
                  square
                  className="size-10"
                  src={product.previewImageUrl}
                  initials={product.name.slice(0, 2).toUpperCase()}
                />

                <div className="min-w-0">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium text-zinc-950 underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    ID:{product.id}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell>{product.category}</TableCell>

            <TableCell>
              <span
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                  getStatusClass(product.status),
                )}
              >
                {product.status}
              </span>
            </TableCell>

            <TableCell>{product.stock}</TableCell>

            <TableCell className="text-zinc-500">{product.price}</TableCell>

            <TableCell className="text-righr">
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-xl hover:bg-zinc-100"
              >
                <MoreHorizontalIcon className="size-5 text-zinc-500" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
