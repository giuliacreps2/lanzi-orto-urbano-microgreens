/**
 * "Informazioni prodotto" — tab + coppie chiave/valore
 * Stile coerente con il resto del sito (no tabella HTML)
 */

"use client";

import { useState } from "react";

type InfoEntry = { label: string; value: string };
type Tab = { id: string; label: string; entries: InfoEntry[] };

const TABS: Tab[] = [
  {
    id: "dettagli",
    label: "Dettagli",
    entries: [
      { label: "Gusto", value: "Piccante, fresco, leggermente pungente." },
      {
        label: "Texture",
        value: "Croccante e succosa, con foglioline tenere.",
      },
      {
        label: "Colore",
        value: "Verde brillante con steli e nervature porpora.",
      },
      { label: "Ricco di", value: "Vitamine A, C, K, folati e antiossidanti." },
    ],
  },
  {
    id: "conservazione",
    label: "Conservazione",
    entries: [
      { label: "Temperatura", value: "Conservare tra 2°C e 6°C." },
      { label: "Shelf life", value: "5 giorni dalla consegna." },
      {
        label: "Consigli",
        value: "Non lavare prima dell'uso. Consumare entro la data indicata.",
      },
    ],
  },
  {
    id: "formato",
    label: "Formato",
    entries: [
      { label: "Peso netto", value: "50g" },
      { label: "Confezionamento", value: "Vaschetta standard" },
      { label: "SKU", value: "MIC-SEN-WAS-50" },
    ],
  },
  {
    id: "disponibilita",
    label: "Disponibilità",
    entries: [
      { label: "Stato", value: "Disponibile su ordine" },
      { label: "Consegna stimata", value: "7–10 giorni dalla semina" },
      { label: "Zone coperte", value: "Tutta Italia" },
    ],
  },
  {
    id: "origine",
    label: "Origine",
    entries: [
      { label: "Coltivazione", value: "Indoor, ambiente controllato" },
      { label: "Sede", value: "Milano, Italia" },
      { label: "Metodo", value: "Biologico, senza pesticidi" },
    ],
  },
];

export function ProductInfoSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section className="info-section">
      <div className="info-inner">
        <h3 className="info-heading">Informazioni prodotto</h3>

        {/* Tab bar */}
        <div className="info-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeTab}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`info-tab ${tab.id === activeTab ? "info-tab--active" : "info-tab--idle"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenuto tab */}
        <div
          id={`tabpanel-${current.id}`}
          role="tabpanel"
          className="info-entries"
        >
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
