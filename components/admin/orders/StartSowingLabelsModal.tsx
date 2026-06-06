"use client";

import { getLabelImageUrl } from "@/lib/api/labels";
import type { LabelDTO } from "@/types/label";

type StartSowingLabelModalProps = {
  orderId: string;
  labels: LabelDTO[];
  isOpen: boolean;
  onClose: () => void;
};

function getProductName(label: LabelDTO) {
  return (
    label.orderItem?.productVariant?.product?.productName ||
    label.orderItem?.productVariant?.skuVariant ||
    "Etichetta prodotto"
  );
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
    <div className="fixed insert-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
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
            X
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {labels.map((label) => (
              <div
                key={label.labelId}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-3"
              >
                <div className="rounded-lg bg-white p-3">
                  <img
                    src={getLabelImageUrl(label.labelId)}
                    alt={getProductName(label)}
                    className="mx-auto max-h-32 object-contain"
                  />
                </div>

                <p className="mt-2 truncate text-sm font-medium text-zinc-950">
                  {getProductName(label)}
                </p>

                {label.batch?.batchCode && (
                  <p className="text.xs text-zinc-500">
                    Lotto: {label.batch.batchCode}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

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
