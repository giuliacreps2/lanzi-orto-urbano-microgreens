import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductCreateForm from "@/components/admin/ProductCreateForm";

export default function AdminCreateProductPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Aggiungi prodotto"
        description="Crea un prodotto, associa una categoria e configura la prima variante vendibile."
      />

      <ProductCreateForm />
    </div>
  );
}
