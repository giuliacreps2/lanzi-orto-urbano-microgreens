import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

type OrderStatusBadgeProps = {
  status: OrderStatus;
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

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        orderStatusClass[status],
      )}
    >
      {orderStatusLabel[status]}
    </span>
  );
}
