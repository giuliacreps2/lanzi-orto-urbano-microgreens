"use client";

import {
  CategoryPreset,
  CategoryAttributePreset,
  CategoryPresetCode,
  categoryPresetOptions,
  CategoryPresets,
} from "@/lib/productSchemas";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createProductCategory } from "@/lib/api/categories";
import { createProductCategoryAttribute } from "@/lib/api/productCategoryAttributes";
import { Button } from "../ui/button";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function getTemporaryToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt")
  );
}

export default function CategoryCreateForm() {
  const router = useRouter();

  const [selectedPresetCode, setSelectedPresetCode] =
    useState<CategoryPresetCode>("MICROGREENS");
  const [categoryName, setCategoryName] = useState("Microgreens");
  const [requiresBatchTracking, setRequiresBatchTracking] = useState(true);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedPreset = useMemo(
    () =>
      categoryPresetOptions.find(
        (preset) => preset.code === selectedPresetCode,
      ) ?? categoryPresetOptions[0],
    [selectedPresetCode],
  );

  function handlePresetChange(code: CategoryPresetCode) {
    const preset = categoryPresetOptions.find((item) => item.code === code);

    if (!preset) return;

    setSelectedPresetCode(code);
    setCategoryName(preset.nameProdCategory);
    setRequiresBatchTracking(preset.requiresBatchTracking);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage(null);

    try {
      const token = getTemporaryToken();

      const createdCategory = await createProductCategory(
        {
          nameProdCategory: categoryName,
          requiresBatchTracking,
          metadataProdCategory: selectedPreset.metadataProdCategory,
        },
        token,
      );

      await Promise.all(
        selectedPreset.attributes.map((attribute) =>
          createProductCategoryAttribute(
            {
              ...attribute,
              defaultValue: attribute.defaultValue ?? null,
              minValue: attribute.minValue ?? null,
              maxValue: attribute.maxValue ?? null,
              unit: attribute.unit ?? null,
              productCategoryId: createdCategory.productCategoryId,
            },
            token,
          ),
        ),
      );

      setStatus("success");

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Errore durante la creazione della categoria",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-zinc-200 bg.white p-5 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-950">
              Informazioni categoria
            </h2>
            <p className="text-sm text-zinc-500">
              Scegli un preset e crea automaticamente i campi tecnici collegati.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Preset categoria
              </span>

              <select
                value={selectedPresetCode}
                onChange={(event) =>
                  handlePresetChange(event.target.value as CategoryPresetCode)
                }
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                {categoryPresetOptions.map((preset) => (
                  <option key={preset.code} value={preset.code}>
                    {preset.nameProdCategory}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Nome categoria
              </span>

              <input
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                required
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
                placeholder="Es. microgreens"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={requiresBatchTracking}
                onChange={(event) =>
                  setRequiresBatchTracking(event.target.checked)
                }
                className="size-4 rounded border-zinc-300"
              />
              Richiede tracciamento lotti
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-950">
              Campi tecnici che verranno creati
            </h2>
            <p className="text-sm text-zinc-500">
              Questi diventeranno i ProductCategoryAttribute della categoria.
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-3 py-2">Label</th>
                  <th className="px-3 py-2">Key</th>
                  <th className="px-3 py-2">Tipo</th>
                  <th className="px-3 py-2">Unità</th>
                  <th className="px-3 py-2">Obbl.</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {selectedPreset.attributes.map((attribute) => (
                  <tr key={attribute.prodCatAttributeKey}>
                    <td className="px-3 py-2 font-medium text-zinc-900">
                      {attribute.prodCatAttributeLabel}
                    </td>
                    <td className="px-3 py-2 font-medium text-zinc-900">
                      {attribute.prodCatAttributeKey}
                    </td>
                    <td className="px-3 py-2 font-medium text-zinc-900">
                      {attribute.attrType}
                    </td>
                    <td className="px-3 py-2 font-medium text-zinc-900">
                      {attribute.unit ?? "—"}
                    </td>
                    <td className="px-3 py-2 font-medium text-zinc-900">
                      {attribute.required ? "Sì" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-950">Riepilogo</h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className=" flex justify-between gap-4">
              <dt className="text-zinc-500">Categoria</dt>
              <dd className="font-medium text-zinc-950">{categoryName}</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Label</dt>
              <dd className="font-medium text-zinc-950">
                {selectedPreset.metadataProdCategory.label_type}
              </dd>
            </div>
          </dl>

          {errorMessage && (
            <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <Button
              type="submit"
              variant="admin"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Creazione..." : "Crea categoria"}
            </Button>

            <Button href="/admin/categories" variant="adminOutline">
              Annulla
            </Button>
          </div>
        </section>
      </aside>
    </form>
  );
}
