import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BentoGrid from "@/components/admin/BentoGrid";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="space-y-6">
        <AdminPageHeader
          title="Dashboard"
          description="Panoramica generale di vendite, catalogo e produzione."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Ordini aperti</p>
            <p className="mt-2 text-3xl font-semibold">12</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Prodotti attivi</p>
            <p className="mt-2 text-3xl font-semibold">24</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Lotti in produtzione</p>
            <p className="mt-2 text-3xl font-semibold">24</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Clienti registrati</p>
            <p className="mt-2 text-3xl font-semibold">86</p>
          </div>
        </div>
      </div>

      <BentoGrid />
    </>
  );
}
