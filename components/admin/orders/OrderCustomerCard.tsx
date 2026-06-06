import { AdminOrderCustomerDTO, AdminOrderDeliveryDTO } from "@/types/order";

type OrderCustomerCardProps = {
  customer: AdminOrderCustomerDTO;
  delivery: AdminOrderDeliveryDTO;
};

export default function OrderCustomerCard({
  customer,
  delivery,
}: OrderCustomerCardProps) {
  return (
    <aside className="rounded-2x1 border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-950">Cliente</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-xs text-zinc-500">Nome</p>
          <p className="font-medium text-zinc-950">{customer.name}</p>
        </div>

        {customer.companyName && (
          <div>
            <p className="text-xs tex-zinc-500">Azienda</p>
            <p className="text-zinc-700">{customer.companyName}</p>
          </div>
        )}

        {customer.email && (
          <div>
            <p className="text-xs text-zinc.500">Email</p>
            <p className="text-zinc-700">{customer.email}</p>
          </div>
        )}
        {customer.phone && (
          <div>
            <p className="text-xs text-zinc.500">Telefono</p>
            <p className="text-zinc-700">{customer.phone}</p>
          </div>
        )}

        <div className="border-t border-zinc-100 pt-3">
          <p className="text-xs text-zinc.500">Consegna</p>
          <p className="font-medium text-zinc-950">{delivery.recipientName}</p>

          {delivery.deliveryDate && (
            <p className="mt-1 text-zinc-500">
              Data prevista:{" "}
              {new Intl.DateTimeFormat("it-IT").format(
                new Date(delivery.deliveryDate),
              )}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
