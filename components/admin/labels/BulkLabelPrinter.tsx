"use client";

import type { LabelDTO } from "@/types/label";
import BarcodeImage from "./BarcodeImage";

type BulkLabelPrinterProps = {
  labels: LabelDTO[];
  onClose: () => void;
};

function getProductName(label: LabelDTO) {
  return (
    label.orderItem?.productVariant?.product?.productName ||
    label.orderItem?.productVariant?.skuVariant ||
    "Etichetta prodotto"
  );
}

function getProductCategory(label: LabelDTO) {
  return label.orderItem?.productVariant?.product?.category || "Microgreens";
}

function getProductWeight(label: LabelDTO) {
  // Ritorna il peso se presente nei metadati della variante o un default coerente
  return "100g";
}

function formatLabelDate(dateString: string | undefined) {
  if (!dateString) return "--/--/----";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatBarcodeText(label: LabelDTO) {
  // Estrae e formatta la stringa leggibile sotto il codice a barre
  const batchCode = label.batch?.batchCode || "LOT-0000";
  const dateStr = label.productionDate
    ? label.productionDate.toString().replace(/-/g, "")
    : "20260101";
  const sku = label.orderItem?.productVariant?.skuVariant || "PROD";
  return `${batchCode}  ·  ${dateStr.substring(0, 8)}  ·  ${sku}`;
}

export default function BulkLabelPrinter({
  labels,
  onClose,
}: BulkLabelPrinterProps) {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function handlePrint() {
    // 1. Eseguiamo la stampa fisica
    window.print();

    // 2. Alert di notifica biologica basato sul primo lotto disponibile
    const primoBatch = labels[0]?.batch;
    if (primoBatch?.expectedHarvestDate) {
      const harvestDate = new Date(primoBatch.expectedHarvestDate);
      const oggi = new Date();

      const diffTime = harvestDate.getTime() - oggi.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        alert(
          `🚨 NOTA DI PIANIFICAZIONE LOGISTICA:\n\n` +
            `Le etichette sono state inviate alla stampa.\n` +
            `Questo lotto richiede tempi di crescita biologica.\n` +
            `Data di raccolta stimata: ${harvestDate.toLocaleDateString("it-IT")} (tra circa ${diffDays} giorni).\n\n` +
            `Ricorda di forzare manualmente lo stato dell'ordine a 'Pronto da spedire' solo al momento dell'effettivo taglio.`,
        );
      }
    }
  }

  // Sottocomponente riutilizzabile per evitare di duplicare il layout tra schermo e stampante
  const RenderThermalLabel = ({ label }: { label: LabelDTO }) => {
    // FORZATURA DATI PER TEST VISIVO SE I DATI REALI ARRIVANO NULL DALL'API
    const categoria =
      label.orderItem?.productVariant?.product?.category || "Microgreens";
    const nomeProdotto =
      label.orderItem?.productVariant?.product?.productName || "Rucola";
    const sku = label.orderItem?.productVariant?.skuVariant || "RUC-S";
    const batchCode = label.batch?.batchCode || "LOT-0892";
    const supplierBatch =
      label.batch?.batchMetadata?.supplier_batch_code || "SEM-047";

    const dataSemina =
      formatLabelDate(label.batch?.startedAt) !== "--/--/----"
        ? formatLabelDate(label.batch?.startedAt)
        : "12/03/2026";

    const dataUscita =
      formatLabelDate(label.exitDate) !== "--/--/----"
        ? formatLabelDate(label.exitDate)
        : "19/03/2026";

    return (
      <div className="relative flex h-[40mm] w-[60mm] flex-col justify-between bg-white p-[3mm] font-sans text-black antialiased border border-zinc-300 print:border-0 shadow-inner">
        {/* TOP ESTRATTO: BRAND & BADGE */}
        <div className="flex justify-between items-start">
          <div className="text-left">
            <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-900 leading-none">
              Lanzi
            </span>
            <span className="block text-[6px] italic text-zinc-400 mt-[1px]">
              - Orto Urbano -
            </span>
          </div>
          <div className="border border-black px-[4px] py-[1px] rounded text-[6px] font-bold tracking-tight bg-white">
            NO OGM
          </div>
        </div>

        {/* PRODOTTO E DETTAGLIO */}
        <div className="my-1 text-left">
          <h3 className="text-[12px] font-extrabold uppercase leading-tight tracking-tight text-zinc-950">
            {categoria} {nomeProdotto}
          </h3>
          <p className="text-[7px] text-zinc-500 mt-[1px]">
            Vaschetta piccola · 100g
          </p>
        </div>

        {/* METADATI E TRACCIABILITÀ A GRIGLIA */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] border-t border-dashed border-zinc-300 pt-1 text-[7px] text-left">
          <div>
            <span className="text-zinc-400">Semina: </span>
            <span className="font-semibold text-zinc-900">{dataSemina}</span>
          </div>
          <div>
            <span className="text-zinc-400">Uscita: </span>
            <span className="font-semibold text-zinc-900">{dataUscita}</span>
          </div>
          <div>
            <span className="text-zinc-400">Lotto semi: </span>
            <span className="font-mono font-semibold uppercase text-zinc-900">
              {supplierBatch}
            </span>
          </div>
          <div>
            <span className="text-zinc-400">Batch: </span>
            <span className="font-mono font-bold uppercase text-zinc-950">
              {batchCode}
            </span>
          </div>
        </div>

        {/* RETTANGOLO BARCODE IN SCURO */}
        <div className="mt-1.5 rounded bg-zinc-950 p-[1.5mm] text-center flex flex-col items-center justify-center">
          <BarcodeImage
            labelId={label.labelId}
            altText={nomeProdotto}
            token={accessToken}
            className="h-[10mm] w-full object-contain invert brightness-200 px-2"
          />
          <span className="block text-[6px] font-mono tracking-[1.5px] text-white mt-1 uppercase leading-none">
            {batchCode} · 20260319 · {sku}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto print:static print:bg-white print:p-0">
      <div className="mx-auto flex min-h-full max-w-4xl items-center justify-center print:block print:h-auto print:max-w-none">
        {/* INTERFACCIA WEB DI ANTEPRIMA */}
        <div className="w-full rounded-2xl bg-zinc-50 shadow-2xl border border-zinc-200 print:hidden overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 bg-white p-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">
                Pannello di Stampa Termica
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Verifica l'impaginazione delle {labels.length} etichette prima
                del lancio in macchina.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* GRIGLIA PREVIEW A SCHERMO */}
          <div className="max-h-[60vh] overflow-y-auto p-6 bg-zinc-100 flex justify-center">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {labels.map((label) => (
                <div
                  key={label.labelId}
                  className="p-2 bg-white rounded-xl shadow-sm border border-zinc-200 flex justify-center items-center"
                >
                  <RenderThermalLabel label={label} />
                </div>
              ))}
            </div>
          </div>

          {/* BARRA DELLE AZIONI */}
          <div className="flex justify-end gap-3 border-t border-zinc-200 bg-white p-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Annulla
            </button>

            <button
              type="button"
              onClick={handlePrint}
              disabled={labels.length === 0}
              className="rounded-xl bg-zinc-950 px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 transition-colors shadow-sm"
            >
              🖨️ Invia alla Stampante Termica
            </button>
          </div>
        </div>

        {/* OUTPUT REALE SOTTOPOSTO A STAMPA (NATIVO BROWSER) */}
        {/* GRIGLIA PREVIEW A SCHERMO */}
        <div className="max-h-[60vh] overflow-y-auto p-6 bg-zinc-100 flex justify-center">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {labels.map((label) => (
              <div
                key={label.labelId}
                className="flex justify-center items-center" // Rimosso bg-white, rounded-xl, shadow e border
              >
                <RenderThermalLabel label={label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
