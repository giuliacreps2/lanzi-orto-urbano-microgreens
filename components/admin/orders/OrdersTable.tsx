import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { MoreHorizontalIcon } from "lucide-react";
import type { OrderStatus } from "@/types/order";

export type AdminOrder = {
  orderId: string;
  orderNumber?: string;
  customerName?: string | null;
  customerType?: "B2C" | "B2B" | null;
  statusOrder: OrderStatus;
  orderCreatedAt: string;
  totalAmount: number;
  itemsCount?: number | null;
  previewImageUrl?: string;
};

type OrdersTableProps = {
  orders: AdminOrder[];
};

const orderStatusLabel: Record<OrderStatus, string> = {
  PENDING: "In attesa",
  PROCESSING: "In preparazione",
  READY_FOR_PICKUP: "Pronto",
  SHIPPED: "Spedito",
  DELIVERED: "Consegnato",
  COMPLETED: "Completato",
  CANCELLED: "Annullato",
};

const orderStatusClass: Record<OrderStatus, string> = {
  PENDING: "bg-zinc-100 text-zinc-600",
  PROCESSING: "bg-yellow-100 text-yellow-800",
  READY_FOR_PICKUP: "bg-orange-100 text-orange-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getOrderNumber(order: AdminOrder) {
  return order.orderNumber || `ORD-${order.orderId.slice(0, 8).toUpperCase()}`;
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Ordine</TableHeader>
          <TableHeader>Cliente</TableHeader>
          <TableHeader>Stato</TableHeader>
          <TableHeader>Data</TableHeader>
          <TableHeader>Totale</TableHeader>
          <TableHeader className="text-right">Azioni</TableHeader>
        </TableRow>
      </TableHead>

      <TableBody>
        {orders.map((order) => {
          const customerName = order.customerName || "Cliente non disponibile";
          const orderNumber = getOrderNumber(order);

          return (
            <TableRow key={order.orderId}>
              <TableCell>
                <div className="min-w-0">
                  <Link
                    href={`/admin/orders/${order.orderId}`}
                    className="font-medium text-zinc-950 underline-offset-4 hover:underline"
                  >
                    {orderNumber}
                  </Link>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    {order.itemsCount ?? 0} prodotti
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    square
                    className="size-10"
                    src={order.previewImageUrl}
                    initials={customerName.slice(0, 2).toUpperCase()}
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-zinc-950">{customerName}</p>

                    {order.customerType && (
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {order.customerType}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                    orderStatusClass[order.statusOrder],
                  )}
                >
                  {orderStatusLabel[order.statusOrder]}
                </span>
              </TableCell>

              <TableCell className="text-zinc-500">
                {formatDate(order.orderCreatedAt)}
              </TableCell>

              <TableCell className="text-zinc-500">
                {formatCurrency(order.totalAmount)}
              </TableCell>

              <TableCell className="text-right">
                <Link
                  href={`/admin/orders/${order.orderId}`}
                  className="inline-flex size-9 items-center justify-center rounded-xl hover:bg-zinc-100"
                  aria-label={`Apri ordine ${orderNumber}`}
                >
                  <MoreHorizontalIcon className="size-5 text-zinc-500" />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
