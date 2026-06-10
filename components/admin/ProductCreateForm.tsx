"use client";

import { CloudinaryUpload } from "@/components/admin/products/CloudinaryUpload";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

import {
  createCompositeProduct,
  updateCompositeProduct,
} from "@/lib/api/products";
import { getProductCategories } from "@/lib/api/categories";
import { getAttributesByCategory } from "@/lib/api/productCategoryAttributes";
import { getPackagingType } from "@/lib/api/packagingTypes";

import type {
  AttributeType,
  AvailabilityStatus,
  CompositeProductFormPayload,
  PackagingType,
  ProductCategory,
  ProductCategoryAttribute,
  ProductImagePayload,
  ProductStatus,
  TechnicalDetails,
  Unit,
} from "@/types/product";

type CloudinaryUploadProps = {
  images: ProductImagePayload[];
  onChange: (
    images:
      | ProductImagePayload[]
      | ((prev: ProductImagePayload[]) => ProductImagePayload[]),
  ) => void;
};

type ProductFormProps = {
  initialData?: Partial<CompositeProductFormPayload> & {
    productId?: string;
    variantName?: string;
  };
  isEdit?: boolean;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

function parseListValue(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isListAttribute(key: string, type: AttributeType) {
  const normalizedType = String(type).toUpperCase();

  return (
    normalizedType === "ARRAY" ||
    normalizedType === "LIST" ||
    normalizedType === "MULTI_SELECT" ||
    normalizedType === "MULTISELECT" ||
    key === "pairings" ||
    key === "certifications"
  );
}

function convertInputValue(
  key: string,
  type: AttributeType,
  value: string | boolean,
) {
  const normalizedType = String(type).toUpperCase();

  if (normalizedType === "BOOLEAN") {
    return Boolean(value);
  }

  if (normalizedType === "NUMBER" || normalizedType === "CURRENCY") {
    if (value === "") return null;
    return Number(value);
  }

  if (typeof value === "string" && isListAttribute(key, type)) {
    return parseListValue(value);
  }

  return String(value);
}

function formatTechnicalValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  return "";
}

function getTemporaryToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt")
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanSkuPart(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 2);
}

function cleanVariantSkuPart(value: string) {
  return value
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9X]/g, "");
}

function getCategorySkuPrefix(category?: ProductCategory | null) {
  const rawCategory =
    category?.metadataProdCategory?.category ||
    category?.nameProdCategory ||
    "";

  const normalized = rawCategory.toString().toUpperCase();

  if (normalized.includes("MICROGREENS")) return "MG";
  if (normalized.includes("MIELE") || normalized.includes("HONEY")) return "ML";

  return cleanSkuPart(normalized);
}

function generateSkuSuggestion({
  category,
  productName,
  variantName,
}: {
  category?: ProductCategory | null;
  productName: string;
  variantName: string;
}) {
  const categoryPart = getCategorySkuPrefix(category);
  const productPart = cleanSkuPart(productName);
  const variantPart = cleanVariantSkuPart(variantName);

  if (!categoryPart || !productPart || !variantPart) return "";

  return `${categoryPart}${productPart}-${variantPart}`;
}

function normalizePageResponse<T>(data: T[] | { content?: T[] }) {
  if (Array.isArray(data)) return data;
  return data.content ?? [];
}

function getInputType(attrType: AttributeType) {
  switch (attrType) {
    case "NUMBER":
    case "CURRENCY":
      return "number";
    case "DATE":
      return "date";
    default:
      return "text";
  }
}

export default function ProductCreateForm({
  initialData,
  isEdit,
}: ProductFormProps) {
  const initialLoadDone = useRef(false);
  const router = useRouter();

  const [images, setImages] = useState<ProductImagePayload[]>(
    initialData?.images ?? [],
  );

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [attributes, setAttributes] = useState<ProductCategoryAttribute[]>([]);
  const [packagingTypes, setPackagingTypes] = useState<PackagingType[]>([]);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [productName, setProductName] = useState(
    initialData?.productName || "",
  );

  const [productSlug, setProductSlug] = useState(
    initialData?.productSlug || "",
  );

  const [slugEditedManually, setSlugEditedManually] = useState(false);

  const [productDescription, setProductDescription] = useState(
    initialData?.productDescription || "",
  );

  const [shortDescription, setShortDescription] = useState(
    initialData?.shortProductDescription || "",
  );

  const [availabilityStatus, setAvailabilityStatus] =
    useState<AvailabilityStatus>(
      initialData?.availabilityStatus || "AVAILABLE",
    );

  const [productIsAvailable, setProductIsAvailable] = useState(
    initialData?.productIsAvailable ?? true,
  );

  const [productStatus, setProductStatus] = useState<ProductStatus>(
    initialData?.productStatus || "DRAFT",
  );

  const [productCategoryId, setProductCategoryId] = useState(
    initialData?.productCategoryId || "",
  );

  const [variantName, setVariantName] = useState(
    initialData?.variantName || "",
  );

  const [skuVariant, setSkuVariant] = useState(initialData?.skuVariant || "");
  const [skuEditedManually, setSkuEditedManually] = useState(Boolean(isEdit));

  const [netWeight, setNetWeight] = useState(
    initialData?.netWeight?.toString() || "",
  );

  const [unit, setUnit] = useState<Unit>(initialData?.unit || "GRAMS");

  const [packTypeId, setPackTypeId] = useState(initialData?.packTypeId || "");

  const [technicalDetails, setTechnicalDetails] = useState<TechnicalDetails>(
    initialData?.technicalDetails || {},
  );

  const [b2cPrice, setB2cPrice] = useState(
    initialData?.b2cPrice?.toString() || "",
  );

  const [b2bPrice, setB2bPrice] = useState(
    initialData?.b2bPrice?.toString() || "",
  );

  const [b2bMinOrderQuantity, setB2bMinOrderQuantity] = useState(
    initialData?.b2bMinOrderQuantity?.toString() || "",
  );

  const selectedCategory = useMemo(
    () =>
      categories.find(
        (category) => category.productCategoryId === productCategoryId,
      ) ?? null,
    [categories, productCategoryId],
  );

  const skuSuggestion = useMemo(
    () =>
      generateSkuSuggestion({
        category: selectedCategory,
        productName,
        variantName,
      }),
    [selectedCategory, productName, variantName],
  );

  useEffect(() => {
    if (!productName || slugEditedManually) return;

    setProductSlug(slugify(productName));
  }, [productName, slugEditedManually]);

  useEffect(() => {
    if (!skuEditedManually) {
      setSkuVariant(skuSuggestion);
    }
  }, [skuSuggestion, skuEditedManually]);

  // Effect caricamento iniziale
  useEffect(() => {
    async function loadInitialData() {
      try {
        const token = getTemporaryToken();
        const categoriesResponse = await getProductCategories(token);
        const nextCategories =
          normalizePageResponse<ProductCategory>(categoriesResponse);
        setCategories(nextCategories);

        console.log("✅ Categorie ricevute:", nextCategories);
        console.log("✅ Numero categorie:", nextCategories.length);

        const targetCategoryId =
          initialData?.productCategoryId ||
          nextCategories[0]?.productCategoryId;

        if (targetCategoryId) {
          setProductCategoryId(targetCategoryId);

          console.log("📡 Chiamo attributi per:", targetCategoryId);
          const attrResponse = await getAttributesByCategory(
            targetCategoryId,
            token,
          );
          const nextAttributes = normalizePageResponse(attrResponse);
          setAttributes(nextAttributes);
          console.log("✅ Attributi ricevuti:", nextAttributes);
          console.log("✅ Numero attributi:", nextAttributes.length);
          console.log(
            "📦 Attributi RAW response:",
            JSON.stringify(attrResponse),
          );

          const initialDetails: TechnicalDetails = {};
          nextAttributes.forEach((attribute) => {
            initialDetails[attribute.prodCatAttributeKey] =
              initialData?.technicalDetails?.[attribute.prodCatAttributeKey] ??
              attribute.defaultValue ??
              "";
          });
          setTechnicalDetails(initialDetails);

          // Segnala che il caricamento iniziale è completato
          initialLoadDone.current = true;
          console.log("🏁 initialLoadDone settato a true");
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Errore caricamento",
        );
      }

      try {
        const token = getTemporaryToken();
        const packagingResponse = await getPackagingType(token);
        const nextPackagingTypes = normalizePageResponse(packagingResponse);
        setPackagingTypes(nextPackagingTypes);
        if (nextPackagingTypes.length > 0) {
          setPackTypeId(
            (current) => current || nextPackagingTypes[0].packTypeId,
          );
        }
      } catch (error) {
        console.error("Errore packaging:", error);
      }
    }

    loadInitialData();
  }, []);

  // Effect SOLO per cambio manuale categoria
  useEffect(() => {
    // Salta il primo trigger causato dal mount/loadInitialData
    console.log(
      "🔄 Effect categoria triggerato, productCategoryId:",
      productCategoryId,
    );
    console.log("🔄 initialLoadDone.current:", initialLoadDone.current);

    if (!initialLoadDone.current) {
      console.log("⏭️ Skip: caricamento iniziale non ancora completato");
      return;
    }
    if (!productCategoryId) {
      console.log("⏭️ Skip: nessuna categoria selezionata");
      return;
    }

    async function loadAttributes() {
      try {
        const token = getTemporaryToken();
        const response = await getAttributesByCategory(
          productCategoryId,
          token,
        );
        const nextAttributes = normalizePageResponse(response);
        setAttributes(nextAttributes);

        setTechnicalDetails((current) => {
          const details: TechnicalDetails = {};
          nextAttributes.forEach((attribute) => {
            const key = attribute.prodCatAttributeKey;
            details[key] =
              current[key] ??
              initialData?.technicalDetails?.[key] ??
              attribute.defaultValue ??
              "";
          });
          return details;
        });
      } catch (error) {
        console.error("Errore attributi:", error);
      }
    }

    loadAttributes();
    console.log(
      "🚀 Carico attributi per cambio manuale categoria:",
      productCategoryId,
    );
  }, [productCategoryId]);

  function updateTechnicalDetail(
    key: string,
    attrType: AttributeType,
    value: string | boolean,
  ) {
    setTechnicalDetails((current) => ({
      ...current,
      [key]: convertInputValue(key, attrType, value),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage(null);

    try {
      const token = getTemporaryToken();
      const getSafeArray = (key: string) => {
        const val = technicalDetails[key];
        if (Array.isArray(val)) return val;
        if (typeof val === "string" && val.trim() !== "") {
          return parseListValue(val);
        }
        return undefined;
      };

      const payload: CompositeProductFormPayload = {
        productName,
        productSlug,
        productDescription,
        shortProductDescription: shortDescription,
        availabilityStatus,
        productIsAvailable,
        productStatus,
        productCategoryId,

        images: Array.isArray(images) ? images : [],

        skuVariant,
        activeVariant: productStatus === "ACTIVE",
        netWeight: Number(netWeight),
        unit,
        packTypeId,
        technicalDetails,

        b2cPrice: b2cPrice === "" ? 0 : Number(b2cPrice),
        b2bPrice: b2bPrice === "" ? 0 : Number(b2bPrice),
        b2bMinOrderQuantity: b2bMinOrderQuantity
          ? Number(b2bMinOrderQuantity)
          : undefined,

        tasteNotes: technicalDetails["taste_notes"] as string | undefined,
        intensity: technicalDetails["intensity"] as number | undefined,
        storage: technicalDetails["storage"] as string | undefined,
        shelfLifeDays: technicalDetails["shelf_life_days"] as
          | number
          | undefined,
        pairings: getSafeArray("pairings"),
        certifications: getSafeArray("certifications"),
        pairingImage: technicalDetails["pairing_image"] as string | undefined,
        expectedHarvest: technicalDetails["expected_harvest"] as
          | string
          | undefined,
      };

      if (isEdit && initialData?.productId) {
        await updateCompositeProduct(initialData.productId, payload, token);
      } else {
        await createCompositeProduct(payload, token);
      }

      setStatus("success");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio del prodotto",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-950">
            Informazioni prodotto
          </h2>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">Titolo</span>
              <input
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                required
                placeholder="Es. Microgreens di Rucola"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">Slug</span>
              <input
                value={productSlug}
                onChange={(event) => {
                  setSlugEditedManually(true);
                  setProductSlug(event.target.value);
                }}
                required
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Descrizione breve
              </span>
              <input
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                placeholder="Descrizione sintetica per card e catalogo"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Descrizione
              </span>
              <textarea
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
                rows={7}
                className="rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Categoria
              </span>
              <select
                value={productCategoryId}
                onChange={(event) => setProductCategoryId(event.target.value)}
                required
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                <option value="" disabled>
                  Seleziona categoria
                </option>

                {categories.map((category) => (
                  <option
                    key={category.productCategoryId}
                    value={category.productCategoryId}
                  >
                    {category.nameProdCategory}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Immagini prodotto
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Carica una o più immagini. La prima immagine caricata viene
              impostata come principale.
            </p>
          </div>

          <div className="mt-5">
            <CloudinaryUpload
              images={images}
              onChange={(updater) => {
                if (typeof updater === "function") {
                  setImages((prev) => updater(prev));
                } else {
                  setImages(updater);
                }
              }}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Variante principale
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Configura il primo formato vendibile del prodotto.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-sm font-medium text-zinc-700">
                Nome variante / formato
              </span>
              <input
                value={variantName}
                onChange={(event) => setVariantName(event.target.value)}
                required
                placeholder="Es. 8x8, 50g, vaschetta grande"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-sm font-medium text-zinc-700">SKU</span>
              <input
                value={skuVariant}
                onChange={(event) => {
                  setSkuEditedManually(true);
                  setSkuVariant(event.target.value.toUpperCase());
                }}
                required
                placeholder="Es. MGRU-8X8"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm uppercase outline-none focus:border-zinc-400"
              />

              <span className="text-xs text-zinc-500">
                Regola consigliata: categoria + prime 2 lettere prodotto +
                variante. Esempi: MGRU-8X8, MLMF-50.
                {skuSuggestion ? ` Suggerito: ${skuSuggestion}` : ""}
              </span>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Peso netto
              </span>
              <input
                type="number"
                value={netWeight}
                onChange={(event) => setNetWeight(event.target.value)}
                required
                min={0}
                step="0.01"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">Unità</span>
              <select
                value={unit}
                onChange={(event) => setUnit(event.target.value as Unit)}
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                <option value="GRAMS">g</option>
                <option value="KILOGRAMS">kg</option>
                <option value="MILLILITERS">ml</option>
                <option value="LITERS">l</option>
                <option value="PIECES">pezzi</option>
              </select>
            </label>

            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-sm font-medium text-zinc-700">
                Packaging
              </span>
              <select
                value={packTypeId}
                onChange={(event) => setPackTypeId(event.target.value)}
                required
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                <option value="" disabled>
                  Seleziona packaging
                </option>

                {packagingTypes.map((packaging) => (
                  <option
                    key={packaging.packTypeId}
                    value={packaging.packTypeId}
                  >
                    {packaging.namePackType}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Dettagli tecnici della variante
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Questi dati verranno salvati nella variante e potranno essere
              riutilizzati per produzione, etichette e catalogo.
            </p>
          </div>

          {attributes.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-zinc-300 p-5 text-sm text-zinc-500">
              Nessun campo tecnico disponibile per questa categoria.
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {attributes.map((attribute) => {
                const key = attribute.prodCatAttributeKey;
                const value = technicalDetails[key];
                const isRequired =
                  (attribute as { required?: boolean }).required ?? false;

                // ── BOOLEAN → checkbox ──
                if (attribute.attrType === "BOOLEAN") {
                  return (
                    <label
                      key={attribute.prodCatAttributeId}
                      className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) =>
                          updateTechnicalDetail(
                            key,
                            attribute.attrType,
                            event.target.checked,
                          )
                        }
                        className="size-4 rounded border-zinc-300"
                      />
                      {attribute.prodCatAttributeLabel}
                    </label>
                  );
                }

                // ── LISTA (pairings, certifications) → textarea ──
                const isListField =
                  key === "pairings" || key === "certifications";
                if (isListField) {
                  return (
                    <label
                      key={attribute.prodCatAttributeId}
                      className="grid gap-1.5 sm:col-span-2"
                    >
                      <span className="text-sm font-medium text-zinc-700">
                        {attribute.prodCatAttributeLabel}
                      </span>
                      <textarea
                        rows={3}
                        value={formatTechnicalValue(value)}
                        placeholder={
                          key === "pairings"
                            ? "Es. Salmone affumicato, Carpaccio di manzo, Tartare di tonno"
                            : "Es. Bio, Senza OGM, Km0"
                        }
                        onChange={(event) =>
                          updateTechnicalDetail(
                            key,
                            attribute.attrType,
                            event.target.value,
                          )
                        }
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                      />
                      <span className="text-xs text-zinc-400">
                        {key === "pairings"
                          ? "Inserisci gli abbinamenti separati da virgola — verranno mostrati come lista nella pagina prodotto."
                          : "Inserisci le certificazioni separate da virgola."}
                      </span>
                    </label>
                  );
                }

                // ── TUTTI GLI ALTRI → input ──
                const PLACEHOLDERS: Record<string, string> = {
                  flavor: "Es. Piccante, fresco, leggermente pungente",
                  color: "Es. Verde brillante con steli porpora",
                  texture: "Es. Croccante e succosa, con foglioline tenere",
                  nutrients: "Es. Vitamine A, C, K, folati e antiossidanti",
                  storage:
                    "Es. Conservare tra 2°C e 6°C, non lavare prima dell'uso",
                  origin: "Es. Coltivazione indoor, Milano",
                  taste_notes: "Es. Note piccanti con retrogusto fresco",
                  variety: "Es. Brassica juncea",
                  tray_size: "Es. 8x8, 12x10",
                  substrate_type: "Es. Fibra di cocco, Torba",
                  benefit_1_title: "Es. Gusto deciso e rinfrescante",
                  benefit_1_text:
                    "Es. Un tocco piccante che esalta ogni preparazione",
                  benefit_2_title: "Es. Versatile e creativo",
                  benefit_2_text: "Es. Perfetto per insalate, panini e bowl",
                  benefit_3_title: "Es. Freschezza assicurata",
                  benefit_3_text:
                    "Es. Raccolto al momento giusto per il massimo sapore",
                  benefit_4_title: "Es. Colore che fa la differenza",
                  benefit_4_text:
                    "Es. Steli colorati per piatti belli quanto buoni",
                  use_1_title: "Es. Sushi & Sashimi",
                  use_1_text:
                    "Es. Sostituisci la pasta di wasabi con i microgreens freschi",
                  use_2_title: "Es. Power Salads",
                  use_2_text:
                    "Es. Aggiunge croccantezza e nutrienti alle tue bowl",
                  use_3_title: "Es. Sandwiches Gourmet",
                  use_3_text: "Es. Perfetto con salmone affumicato o avocado",
                };

                return (
                  <label
                    key={attribute.prodCatAttributeId}
                    className="grid gap-1.5"
                  >
                    <span className="text-sm font-medium text-zinc-700">
                      {attribute.prodCatAttributeLabel}
                      {isRequired ? " *" : ""}
                    </span>
                    <div className="flex gap-2">
                      <input
                        type={getInputType(attribute.attrType)}
                        value={formatTechnicalValue(value)}
                        required={isRequired}
                        min={attribute.minValue ?? undefined}
                        max={attribute.maxValue ?? undefined}
                        placeholder={PLACEHOLDERS[key]}
                        onChange={(event) =>
                          updateTechnicalDetail(
                            key,
                            attribute.attrType,
                            event.target.value,
                          )
                        }
                        className="h-10 min-w-0 flex-1 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
                      />
                      {attribute.unit && (
                        <span className="inline-flex h-10 items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500">
                          {attribute.unit}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-950">Prezzi</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Prezzo B2C
              </span>
              <input
                type="number"
                value={b2cPrice}
                onChange={(event) => setB2cPrice(event.target.value)}
                min={0}
                step="0.01"
                placeholder="0,00"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Prezzo B2B
              </span>
              <input
                type="number"
                value={b2bPrice}
                onChange={(event) => setB2bPrice(event.target.value)}
                min={0}
                step="0.01"
                placeholder="0,00"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Minimo B2B
              </span>
              <input
                type="number"
                value={b2bMinOrderQuantity}
                onChange={(event) => setB2bMinOrderQuantity(event.target.value)}
                min={1}
                placeholder="Es. 10"
                className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-950">Stato</h2>

          <div className="mt-4 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Stato prodotto
              </span>
              <select
                value={productStatus}
                onChange={(event) =>
                  setProductStatus(event.target.value as ProductStatus)
                }
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                <option value="ACTIVE">Attivo</option>
                <option value="DRAFT">Bozza</option>
                <option value="ARCHIVED">Archiviato</option>
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-700">
                Disponibilità
              </span>
              <select
                value={availabilityStatus}
                onChange={(event) =>
                  setAvailabilityStatus(
                    event.target.value as AvailabilityStatus,
                  )
                }
                className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400"
              >
                <option value="AVAILABLE">Disponibile</option>
                <option value="OUT_OF_STOCK">Esaurito</option>
                <option value="COMING_SOON">In arrivo</option>
                <option value="UNAVAILABLE">Non disponibile</option>
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={productIsAvailable}
                onChange={(event) =>
                  setProductIsAvailable(event.target.checked)
                }
                className="size-4 rounded border-zinc-300"
              />
              Visibile/acquistabile
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-950">Riepilogo</h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Categoria</dt>
              <dd className="text-right font-medium text-zinc-950">
                {selectedCategory?.nameProdCategory ?? "—"}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">SKU</dt>
              <dd className="text-right font-medium text-zinc-950">
                {skuVariant || "—"}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Campi tecnici</dt>
              <dd className="font-medium text-zinc-950">{attributes.length}</dd>
            </div>
          </dl>

          {errorMessage && (
            <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-2">
            {isEdit ? (
              // Modalità modifica
              <>
                <Button
                  type="submit"
                  variant="admin"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Salvataggio..."
                    : "💾 Salva modifiche"}
                </Button>
                <Button
                  type="button"
                  variant="adminOutline"
                  onClick={() => router.back()}
                  disabled={status === "loading"}
                >
                  Annulla
                </Button>
              </>
            ) : (
              // Modalità creazione
              <>
                <Button
                  type="submit"
                  variant="admin"
                  disabled={status === "loading"}
                  onClick={() => {
                    /* submit normale → va a /admin/products */
                  }}
                >
                  {status === "loading" ? "Salvataggio..." : "Salva"}
                </Button>
                <Button
                  type="button"
                  variant="adminOutline"
                  disabled={status === "loading"}
                  onClick={async (e) => {
                    // Salva e resta nel form per aggiungere un'altra variante
                    // Per ora redirect al prodotto appena creato
                    const form = (e.target as HTMLElement).closest("form");
                    form?.requestSubmit();
                  }}
                >
                  {status === "loading" ? "Salvataggio..." : "Salva modifiche"}
                </Button>
                <Button
                  type="button"
                  variant="adminOutline"
                  onClick={() => router.back()}
                  disabled={status === "loading"}
                >
                  Annulla
                </Button>
              </>
            )}
          </div>
        </section>
      </aside>
    </form>
  );
}
