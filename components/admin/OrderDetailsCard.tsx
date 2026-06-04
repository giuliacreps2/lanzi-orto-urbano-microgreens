import { useState } from "react";
import { CategoryPresets } from "@/lib/productSchemas";
import { cn } from "@/lib/utils";

type OrderStatus =
  | "RICEVUTO"
  | "IN_SEMINA"
  | "PRONTO_CONFEZIONAMENTO"
  | "SPEDITO";

interface OrderDetailProps {
  order: {
    id: string;
    customerName: string;
    categoryCode: "MICROGREENS" | "HONEY"; // Determina quale preset leggere
    productName: string;
    quantity: number;
    initialStatus: OrderStatus;
  };
  onStatusChange: (newStatus: OrderStatus) => void;
}

export default function OrderDetailsCard({
  order,
  onStatusChange,
}: OrderDetailProps) {
  const [status, setStatus] = useState<OrderStatus>(order.initialStatus);

  const technicalPreset = CategoryPresets[order.categoryCode];

  const handleStartSeeding = () => {
    const nextStatus = "IN_SEMINA";
    setStatus(nextStatus);
    onStatusChange(nextStatus);
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
        {/* Intestazione Ordine */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-zinc-400">
              Dettaglio Gestione
            </span>
            <h2 className="text-xl font-bold text-zinc-950 mt-0.5">
              {order.id}
            </h2>
          </div>
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
              status === "IN_SEMINA"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700",
            )}
          >
            {status}
          </span>
        </div>

        {/* Dati Commerciali */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-500">Cliente B2B</p>
            <p className="font-medium text-zinc-900 mt-0.5">
              {order.customerName}
            </p>
          </div>
          <div>
            <p className="text-zinc-500">Articolo richiesto</p>
            <p className="font-medium text-zinc-900 mt-0.5">
              {order.productName} ({order.quantity} vaschette)
            </p>
          </div>
        </div>

        {/* SCHEDA TECNICA AGRONOMICA (Visualizzazione Condizionale basata sulle Costanti) */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Specifiche di Produzione Categoria:{" "}
            {technicalPreset.nameProdCategory}
          </h3>

          {order.categoryCode === "MICROGREENS" ? (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200/60">
                <span className="text-zinc-400 text-[11px] block">
                  Fase Buio
                </span>
                <span className="font-bold text-zinc-800 text-sm">
                  {technicalPreset.attributes.find(
                    (a) => a.prodCatAttributeKey === "days_black",
                  )?.defaultValue || "3"}{" "}
                  gg
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200/60">
                <span className="text-zinc-400 text-[11px] block">
                  Fase Luce
                </span>
                <span className="font-bold text-zinc-800 text-sm">
                  {technicalPreset.attributes.find(
                    (a) => a.prodCatAttributeKey === "days_light",
                  )?.defaultValue || "9"}{" "}
                  gg
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200/60">
                <span className="text-zinc-400 text-[11px] block">Densità</span>
                <span className="font-bold text-zinc-800 text-sm">
                  {technicalPreset.attributes.find(
                    (a) => a.prodCatAttributeKey === "seed_quantity_g",
                  )?.defaultValue || "12"}{" "}
                  g
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">
              Nessuna azione agronomica richiesta. Prodotto pronto per
              l'invasamento.
            </p>
          )}
        </div>

        {/* Azione di Trigger per la Presentazione */}
        {status === "RICEVUTO" && (
          <button
            onClick={handleStartSeeding}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm py-2.5 rounded-xl font-semibold transition-colors"
          >
            🌱 Metti in Semina e Genera Etichetta
          </button>
        )}
      </div>
    );
  };
}
