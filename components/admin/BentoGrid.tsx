import { Table, TableRow, TableHeader, TableHead } from "../ui/table";

// --- TIPI TYPESCRIPT PER L'INTEGRAZIONE BACKEND ---
interface OrderMock {
  id: string;
  customer: string;
  type: "B2B" | "B2C";
  total: number;
  status: "In Preparazione" | "Spedito" | "In Attesa";
  date: string;
}

interface BatchMock {
  id: string;
  product: string;
  category: "MICROGREENS" | "HONEY";
  daysToHarvest?: number;
  status: "In Crescita" | "Pronto";
}

interface SubscriptionMock {
  id: string;
  company: string;
  frequency: string;
  nextDelivery: string;
}

export default function AdminDashboard() {
  // Dati simulati pronti per rispecchiare i tuoi endpoint Spring Boot
  const ordiniRecenti: OrderMock[] = [
    {
      id: "ORD-2026-001",
      customer: "Ristorante Da Mario",
      type: "B2B",
      total: 145.5,
      status: "In Preparazione",
      date: "Oggi",
    },
    {
      id: "ORD-2026-002",
      customer: "Luca Rossi",
      type: "B2C",
      total: 24.0,
      status: "Spedito",
      date: "Ieri",
    },
    {
      id: "ORD-2026-003",
      customer: "Bio Market srl",
      type: "B2B",
      total: 320.0,
      status: "In Attesa",
      date: "2 giorni fa",
    },
  ];

  const lottiAttivi: BatchMock[] = [
    {
      id: "LOT-042",
      product: "Microgreens Rucola",
      category: "MICROGREENS",
      daysToHarvest: 3,
      status: "In Crescita",
    },
    {
      id: "LOT-043",
      product: "Microgreens Ravanello",
      category: "MICROGREENS",
      daysToHarvest: 0,
      status: "Pronto",
    },
  ];

  const abbonamentiAttivi: SubscriptionMock[] = [
    {
      id: "SUB-001",
      company: "Hotel Plaza B2B",
      frequency: "Settimanale",
      nextDelivery: "05/06/2026",
    },
    {
      id: "SUB-002",
      company: "Catering Bologna",
      frequency: "Bisettimanale",
      nextDelivery: "08/06/2026",
    },
  ];

  return (
    <div className="py-6 min-h-screen font-sans">
      {/* 2. AREA PRINCIPALE: BENTO GRID STRATEGICA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BLOCCO 1 (Grande - Col span 2): Tabella Ordini Recenti (Scorciatoia per il Dettaglio Ordine + Etichetta) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Ordini Recenti
              </h3>
              <span className="text-xs text-blue-600 bg-blue-50 border border-gray-100 px-2.5 py-1 rounded-full font-normal">
                Aggiornato in tempo reale
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-zinc-800 uppercase rounded-lg border-b border-zinc-500 pb-2.5">
                  <tr>
                    <th className="py-3 px-4 font-normal">ID Ordine</th>
                    <th className="py-3 px-4 font-normal">Cliente</th>
                    <th className="py-3 px-4 font-normal">Tipologia</th>
                    <th className="py-3 px-4 font-normal">Totale</th>
                    <th className="py-3 px-4 font-normal">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 pt-4">
                  {ordiniRecenti.map((ordine) => (
                    <tr
                      key={ordine.id}
                      className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-5 px-4 font-normal text-zinc-500">
                        {ordine.id}
                      </td>
                      <td className="py-5 px-4 text-gray-800 font-medium">
                        {ordine.customer}
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${ordine.type === "B2B" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}
                        >
                          {ordine.type}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-gray-700 font-medium">
                        €{ordine.total.toFixed(2)}
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-normal ${
                            ordine.status === "In Preparazione"
                              ? "bg-amber-50 text-amber-700"
                              : ordine.status === "Spedito"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {ordine.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 pt-2.5 mb-2 border-t border-gray-50 text-right">
            <a
              href="/admin/orders"
              className="text-xs font-semibold transition-colors rounded-full border border-spacing-5 p-3 hover:bg-gray-100"
            >
              Vai a gestione Ordini →
            </a>
          </div>
        </div>

        {/* BLOCCO 2 (Medio - Quadrato): Stato Produzione Lotti (Richiama le specifiche di Categoria/Agronomiche) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Monitoraggio Lotti
            </h3>
            <div className="space-y-4">
              {lottiAttivi.map((lotto) => (
                <div
                  key={lotto.id}
                  className="p-3.5 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        {lotto.id}
                      </p>
                      <h4 className="text-sm font-bold text-gray-800 mt-0.5">
                        {lotto.product}
                      </h4>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-normal ${lotto.status === "Pronto" ? "bg-emerald-100 text-emerald-800 animate-pulse" : "bg-amber-100 text-amber-800"}`}
                    >
                      {lotto.status}
                    </span>
                  </div>
                  {lotto.category === "MICROGREENS" && (
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/60">
                      <span>Ciclo di crescita:</span>
                      <span className="font-semibold text-gray-700">
                        {lotto.daysToHarvest === 0
                          ? "⚠️ Raccolta Oggi"
                          : `Mancano ${lotto.daysToHarvest} gg`}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-4 hover:bg-gray-100 text-xs py-3 rounded-xl border font-semibold transition-colors">
            Gestisci Cicli di Raccolta
          </button>
        </div>

        {/* BLOCCO 3 (Medio - Allungato): Scorciatoia Catalogo & Preset Modelli */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Preset Catalogo
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Configurazione rapida di nuove varianti prodotto.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-12">
              <div className="p-3 bg-green-50/60 rounded-xl border border-green-100 text-center hover:bg-green-50 transition-colors cursor-pointer">
                <span className="text-xl">🌱</span>
                <h4 className="text-xs font-bold text-green-800 mt-1">
                  Microgreens
                </h4>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-center hover:bg-amber-50 transition-colors cursor-pointer">
                <span className="text-xl">🍯</span>
                <h4 className="text-xs font-bold text-amber-800 mt-1">Miele</h4>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCCO 4 (Grande - Col span 2): Logica Abbonamenti e Consegne Ricorrenti (Dimostra la complessità delle relazioni dell'ERD) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Abbonamenti B2B & Ricorsività
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Integrazione automatica delle relazioni Subscription ➔
                  Delivery ➔ Payment
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {abbonamentiAttivi.map((sub) => (
                <div
                  key={sub.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold">
                      🔄
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">
                        {sub.company}
                      </h4>
                      <p className="text-xs text-gray-400">
                        ID Contratto: {sub.id} • Rinnovo {sub.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 text-xs">
                    <div className="text-left sm:text-right">
                      <p className="text-gray-400">Prossima Consegna</p>
                      <p className="font-semibold text-gray-700 mt-0.5">
                        {sub.nextDelivery}
                      </p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium text-[11px]">
                      Fattura Autogenerata
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
            <span className="text-gray-400">
              Punti fedeltà automatici attivi
            </span>
            <button className="text-xs font-semibold transition-colors rounded-full border border-spacing-5 p-3 hover:bg-gray-100">
              Vedi pianificazione consegne →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
