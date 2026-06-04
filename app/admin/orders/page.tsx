"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import OrdersTable, {
  type AdminOrder,
} from "@/components/admin/orders/OrdersTable";
import { getAdminOrders } from "@/lib/api/orders";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const accessToken = localStorage.getItem("token");
        const response = (await getAdminOrders(accessToken)) as any;

        console.log("Dati reali ricevuti:", response);

        {
          /*if (!response) {
          throw new Error("Il server ha restituito una risposta vuota.");
        }*/
        }

        const rawContent = response?.content || [];

        {
          /*if (!Array.isArray(rawContent)) {
          console.error(
            "ERRORE: 'content' non è un array! Controlla la struttura di Page.",
          );
          setOrders([]);
          setTotalElements(0);
          return;
        }*/
        }

        const mappedOrders: AdminOrder[] = rawContent.map(
          (backendOrder: any) => {
            const clientName =
              backendOrder?.customer?.name || "Cliente non disponibile";
            const clientType = backendOrder?.customer?.customerType || null;

            {
              /*return {
              orderId: backendOrder.orderId,
              orderNumber: backendOrder.orderNumber,
              customerName: clientName,
              customerType: clientType,
              statusOrder: backendOrder.statusOrder,
              orderCreatedAt: backendOrder.orderCreatedAt,
              totalAmount: backendOrder.totalAmount,
              // Calcolo il numero di elementi contando la lunghezza dell'array items
              itemsCount: backendOrder.items ? backendOrder.items.length : 0,
              previewImageUrl: undefined,
            };
          },
        );*/
            }

            return {
              orderId: backendOrder?.orderId,
              orderNumber:
                backendOrder?.orderNumber ||
                `ORD-${backendOrder?.orderId?.slice(0, 8).toUpperCase()}`,
              customerName: clientName,
              customerType: clientType,
              statusOrder: backendOrder?.statusOrder || "PENDING",
              orderCreatedAt: backendOrder?.orderCreatedAt,
              totalAmount: backendOrder?.totalAmount || 0,
              itemsCount: Array.isArray(backendOrder?.items)
                ? backendOrder.items.reduce(
                    (sum: number, item: any) => sum + (item.quantity || 0),
                    0,
                  )
                : 0,
              previewImageUrl: undefined,
            };
          },
        );

        // 3. Salvo i dati mappati e i metadati della pagina negli stati di React
        setOrders(mappedOrders);

        if (response?.page) {
          setTotalElements(response.page.totalElements ?? 0);
          setTotalPages(response.page.totalPages ?? 0);
          setCurrentPage(response.page.number ?? 0);
        } else {
          setTotalElements(mappedOrders.length);
          setTotalPages(1);
          setCurrentPage(0);
        }
      } catch (error: any) {
        console.error("Errore durante il mapping o il caricamento:", error);
        setErrorMessage(
          "Non è stato possibile caricare gli ordini. Controlla il login o riprova.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Ordini"
        description="Gestisci ordini, stato di preparazione, semina e stampa delle etichette."
      />

      <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-950">
              Lista ordini
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {isLoading
                ? "Caricamento ordini..."
                : `${totalElements} ordini trovati`}
            </p>
          </div>

          {!isLoading && totalPages > 0 && (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                Pagina {currentPage + 1} di {totalPages}
              </span>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="p-4">
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          </div>
        )}

        {!errorMessage && isLoading && (
          <div className="p-6 text-sm text-zinc-500">Caricamento...</div>
        )}

        {!errorMessage && !isLoading && orders.length === 0 && (
          <div className="p-6">
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center">
              <h3 className="text-sm font-semibold text-zinc-950">
                Nessun ordine trovato
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Quando arriveranno nuovi ordini, li vedrai qui.
              </p>
            </div>
          </div>
        )}

        {!errorMessage && !isLoading && orders.length > 0 && (
          <div className="overflow-x-auto">
            <OrdersTable orders={orders} />
          </div>
        )}
      </section>
    </div>
  );
}
