"use client";

import { useState } from "react";
import type { ProductPageData } from "@/types/product-types";

type Props = {
  variant: ProductPageData["variants"][number];
  technicalDetails: Record<string, unknown>;
  delivery: ProductPageData["delivery"];
};

export function ProductInfoSection({
  variant,
  technicalDetails,
  delivery,
}: Props) {
  const [activeTab, setActiveTab] = useState("dettagli");

  const deliveryText =
    delivery.kind === "harvest"
      ? `Raccolta stimata: ${new Date(delivery.expectedHarvest).toLocaleDateString("it-IT", { day: "2-digit", month: "long" })}`
      : `Spedizione entro ${delivery.leadTimeHours}h`;

  const TABS = [
    {
      id: "dettagli",
      label: "Dettagli",
      entries: [
        {
          label: "Gusto",
          value: String(
            technicalDetails["flavor"] ??
              technicalDetails["taste_notes"] ??
              "—",
          ),
        },
        { label: "Texture", value: String(technicalDetails["texture"] ?? "—") },
        { label: "Colore", value: String(technicalDetails["color"] ?? "—") },
        {
          label: "Ricco di",
          value: String(technicalDetails["nutrients"] ?? "—"),
        },
      ],
    },
    {
      id: "conservazione",
      label: "Conservazione",
      entries: [
        {
          label: "Temperatura",
          value: technicalDetails["storage_temperature_c"]
            ? `${technicalDetails["storage_temperature_c"]}°C`
            : "—",
        },
        {
          label: "Shelf life",
          value: technicalDetails["shelf_life_days"]
            ? `${technicalDetails["shelf_life_days"]} giorni dalla consegna`
            : "—",
        },
        {
          label: "Consigli",
          value: String(technicalDetails["storage"] ?? "—"),
        },
      ],
    },
    {
      id: "formato",
      label: "Formato",
      entries: [
        {
          label: "Peso netto",
          value: `${variant.netWeight}${variant.unit === "GRAMS" ? "g" : variant.unit.toLowerCase()}`,
        },
        { label: "Confezionamento", value: variant.packagingType.namePackType },
        { label: "SKU", value: variant.skuVariant },
      ],
    },
    {
      id: "disponibilita",
      label: "Disponibilità",
      entries: [
        { label: "Stato", value: "Disponibile su ordine" },
        { label: "Consegna stimata", value: deliveryText },
        { label: "Zone coperte", value: "Tutta Italia" },
      ],
    },
    {
      id: "origine",
      label: "Origine",
      entries: [
        {
          label: "Coltivazione",
          value: String(
            technicalDetails["origin"] ?? "Indoor, ambiente controllato",
          ),
        },
        { label: "Sede", value: "Milano, Italia" },
        {
          label: "Metodo",
          value: String(
            technicalDetails["certifications"] ?? "Biologico, senza pesticidi",
          ),
        },
      ],
    },
  ];

  const current = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section className="info-section">
      <div className="info-inner">
        <h3 className="info-heading">Informazioni prodotto</h3>
        <div className="info-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeTab}
              onClick={() => setActiveTab(tab.id)}
              className={`info-tab ${tab.id === activeTab ? "info-tab--active" : "info-tab--idle"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="info-entries">
          {current.entries.map((entry) => (
            <div key={entry.label} className="info-entry">
              <dt className="info-entry-label">{entry.label}</dt>
              <dd className="info-entry-value">{entry.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
