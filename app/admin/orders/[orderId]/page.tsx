"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BulkLabelPrinter from "@/components/admin/labels/BulkLabelPrinter";
import OrderCustomerCard from "@/components/admin/orders/OrderCustomerCard";
import OrderItemsPanel from "@/components/admin/orders/OrderItemsPanel";
import OrderStatusBadge from "@/components/admin/orders/OrderStatusBadge";
import StartSowingLabelModal from "@/components/admin/orders/StartSowingLabelsModal";
import { generateLabelsByOrderId } from "@/lib/api/labels";
import { getAdminOrderDetail } from "@/lib/api/orders";
import { LabelDTO } from "@/types/label";
import { AdminOrderDetailDTO } from "@/types/order";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as React from "react";

type AdminOrderDetailPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default function AdminOrderDetailPage({
  params,
}: AdminOrderDetailPageProps) {
  const unwrappedParams = React.use(params);
  const orderId = unwrappedParams.orderId;

  const [order, setOrder] = useState<AdminOrderDetailDTO | null>(null);
  const [labels, setLabels] = useState<LabelDTO[]>([]);
  const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingLabels, setIsGeneratingLabels] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadOrder() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const accessToken =
        localStorage.getItem("accessToken") || localStorage.getItem("token");

      const response = await getAdminOrderDetail(orderId, accessToken);
      setOrder(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Non è stato possibile caricare il dettaglio dell'ordine.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStartSowing() {
    try {
      setIsGeneratingLabels(true);
      setErrorMessage(null);

      const accessToken =
        localStorage.getItem("accessToken") || localStorage.getItem("token");

      const generatedLabels = await generateLabelsByOrderId(
        orderId,
        accessToken,
      );

      console.log("LABELS:", JSON.stringify(generatedLabels, null, 2));

      setLabels(generatedLabels);
      setIsLabelsModalOpen(true);

      await loadOrder();
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Non è stato possibile avviare la semina o generare le etichette.",
      );
    } finally {
      setIsGeneratingLabels(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Dettaglio ordine"
          description="Caricamento ordine in corso..."
        />

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          Caricamento...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Ordine non trovato"
          description="Non è stato possibile recuperare questo ordine."
        />

        <Link
          href="/admin/orders"
          className="text-sm font-medium text-zinc-950 underline"
        >
          Torna agli ordini
        </Link>
      </div>
    );
  }

  const canStartSowing =
    order.statusOrder === "PENDING" || order.statusOrder === "PROCESSING";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-950 hover:underline"
          >
            ← Torna agli ordini
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Ordine {order.orderNumber}
            </h1>

            <OrderStatusBadge status={order.statusOrder} />
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Creato il{" "}
            {new Intl.DateTimeFormat("it-IT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(order.orderCreatedAt))}
          </p>
        </div>

        {/* Desktop action */}
        <div className="hidden lg:block">
          <button
            type="button"
            onClick={handleStartSowing}
            disabled={isGeneratingLabels}
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isGeneratingLabels
              ? "Generazione etichette..."
              : "🌱 Avvia Semina e Stampa"}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Mobile action: subito sotto l'ordine */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={handleStartSowing}
          disabled={!canStartSowing || isGeneratingLabels}
          className="w-full rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {isGeneratingLabels ? "Generazione etichette..." : "🌱 Avvia Semina"}
        </button>

        <p className="mt-2 text-xs text-zinc-500">
          Avvia la produzione, genera le etichette e prepara la stampa.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-zinc-950">
                    Prodotti
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {order.items.length} prodotti in questo ordine
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-zinc-500">Totale ordine</p>
                  <p className="text-lg font-semibold text-zinc-950">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            <OrderItemsPanel items={order.items} />
          </section>
        </main>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          {/* Desktop action card secondaria */}
          <section className="hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:block">
            <button
              type="button"
              onClick={handleStartSowing}
              disabled={!canStartSowing || isGeneratingLabels}
              className="w-full rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {isGeneratingLabels
                ? "Generazione etichette..."
                : "🌱 Avvia Semina"}
            </button>

            <p className="mt-3 text-xs text-zinc-500">
              Avvia la produzione, genera le etichette e prepara la stampa.
            </p>
          </section>

          <OrderCustomerCard
            customer={order.customer}
            delivery={order.delivery}
          />
        </aside>
      </div>

      <StartSowingLabelModal
        orderId={orderId}
        labels={labels}
        isOpen={isLabelsModalOpen}
        onClose={() => setIsLabelsModalOpen(false)}
      />
    </div>
  );
}
