"use client";

import { getLabelImageUrl } from "@/lib/api/labels";
import type { LabelDTO } from "@/types/label";

type StartSowingLabelModalProps = {
  orderId: string;
  labels: LabelDTO[];
  isOpen: boolean;
  onClose: () => void;
};

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function StartSowingLabelModal({
  orderId,
  labels,
  isOpen,
  onClose,
}: StartSowingLabelModalProps) {
  if (!isOpen) return null;

  function handlePrintAll() {
    window.open(`/admin/orders/${orderId}/labels`, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              Etichette generate
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Sono state generate {labels.length} etichette per questo ordine.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100"
          >
            ✕
          </button>
        </div>

        {/* Lista etichette */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {labels.map((label, index) => (
              <div
                key={label.labelId}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-3"
              >
                {/* Barcode */}
                <div className="rounded-lg bg-white p-3">
                  <img
                    src={getLabelImageUrl(label.labelId)}
                    className="mx-auto max-h-32 object-contain"
                    style={{ background: "#ffffff" }}
                  />
                </div>

                {/* Dati etichetta */}
                <div className="mt-2 space-y-1">
                  {label.productName && (
                    <p className="text-sm font-medium text-zinc-950">
                      {label.productName}
                    </p>
                  )}

                  {label.barcodeData && (
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium">Lotto:</span>{" "}
                      {label.barcodeData}
                    </p>
                  )}

                  {label.eanCode && (
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium">EAN:</span> {label.eanCode}
                    </p>
                  )}

                  {label.productionDate && (
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium">Produzione:</span>{" "}
                      {formatDate(label.productionDate)}
                    </p>
                  )}

                  {label.bestBeforeDate && (
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium">Scadenza:</span>{" "}
                      {formatDate(label.bestBeforeDate)}
                    </p>
                  )}

                  {label.exitDate && (
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium">Data uscita:</span>{" "}
                      {formatDate(label.exitDate)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-200 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          >
            Chiudi
          </button>
          <button
            type="button"
            onClick={handlePrintAll}
            className="rounded-xl bg-zinc-950 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            🖨️ Stampa tutte le etichette
          </button>
        </div>
      </div>
    </div>
  );
}
