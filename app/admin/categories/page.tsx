import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CategoryCreateForm from "@/components/admin/CategoryCreateForm";

export default function AdminCreateCategoryPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nuova categoria"
        description="Crea una categoria prodotto e genera i campi tecnici collegati."
      />

      <CategoryCreateForm />
    </div>
  );
}
