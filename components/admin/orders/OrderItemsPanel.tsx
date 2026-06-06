import type { AdminOrderItemDTO } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderItemsPanelProps = {
  items: AdminOrderItemDTO[];
};

type FeatureChip = {
  icon: string;
  label: string;
  value: string | number;
};

// lascia qui le tue funzioni:
// getTechnicalValue()
// getCategoryConfig()
// getCategoryFeatures()

function getTechnicalValue(
  details: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!details) return null;

  for (const key of keys) {
    const value = details[key];

    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }

  return null;
}

function getCategoryConfig(categoryName: string) {
  const category = categoryName?.toLowerCase() || "";

  if (category.includes("microgreens")) {
    return {
      icon: "🌱",
      label: "Microgreens",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    };
  }

  if (category.includes("miele")) {
    return {
      icon: "🍯",
      label: "Miele",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200/60",
    };
  }

  if (category.includes("funghi")) {
    return {
      icon: "🍄",
      label: "Funghi",
      badgeClass: "bg-stone-100 text-stone-700 border-stone-300/60",
    };
  }

  if (category.includes("zafferano")) {
    return {
      icon: "🌺",
      label: "Zafferano",
      badgeClass: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60",
    };
  }

  return {
    icon: "🧺",
    label: categoryName || "Prodotto",
    badgeClass: "bg-zinc-50 text-zinc-700 border-zinc-200",
  };
}
function getCategoryFeatures(item: AdminOrderItemDTO): FeatureChip[] {
  const category = item.categoryName?.toLowerCase() || "";

  if (category.includes("microgreens")) {
    const blackoutDays = getTechnicalValue(item.technicalDetails, [
      "blackoutDays",
      "daysBlack",
      "days_black",
      "days-black",
    ]);

    const lightDays = getTechnicalValue(item.technicalDetails, [
      "lightDays",
      "daysLight",
      "days_light",
      "days-light",
    ]);

    const seedGrams = getTechnicalValue(item.technicalDetails, [
      "seedGrams",
      "seedQuantity",
      "seedQuantityGrams",
      "seedsGrams",
      "seedsQuantity",
    ]);

    const sowingDuration = getTechnicalValue(item.technicalDetails, [
      "sowingDurationDays",
      "sowingDuration",
      "daysToHarvest",
      "days-to-harvest",
    ]);

    const features: FeatureChip[] = [];

    if (blackoutDays) {
      features.push({
        icon: "🌑",
        label: "Buio",
        value: `${blackoutDays} gg`,
      });
    }

    if (lightDays) {
      features.push({
        icon: "☀️",
        label: "Luce",
        value: `${lightDays} gg`,
      });
    }

    if (seedGrams) {
      features.push({
        icon: "🌾",
        label: "Semi",
        value: `${seedGrams} g`,
      });
    }

    if (sowingDuration) {
      features.push({
        icon: "⏳",
        label: "Durata",
        value: `${sowingDuration} gg`,
      });
    }

    return features;
  }

  if (category.includes("miele")) {
    const honeyType = getTechnicalValue(item.technicalDetails, [
      "honeyType",
      "tipoMiele",
      "type",
    ]);

    const harvestYear = getTechnicalValue(item.technicalDetails, [
      "harvestYear",
      "year",
      "annoRaccolta",
    ]);

    const origin = getTechnicalValue(item.technicalDetails, [
      "origin",
      "areaOrigin",
      "zonaOrigine",
    ]);

    const crystallization = getTechnicalValue(item.technicalDetails, [
      "crystallization",
      "crystallizationStatus",
      "cristallizzazione",
    ]);

    const features: FeatureChip[] = [];

    if (honeyType) {
      features.push({
        icon: "🐝",
        label: "Tipo",
        value: honeyType,
      });
    }

    if (harvestYear) {
      features.push({
        icon: "📅",
        label: "Annata",
        value: harvestYear,
      });
    }

    if (origin) {
      features.push({
        icon: "📍",
        label: "Origine",
        value: origin,
      });
    }

    if (crystallization) {
      features.push({
        icon: "✨",
        label: "Stato",
        value: crystallization,
      });
    }

    return features;
  }

  if (category.includes("funghi")) {
    const substrate = getTechnicalValue(item.technicalDetails, [
      "substrate",
      "substrateType",
      "substrato",
    ]);

    const incubationDays = getTechnicalValue(item.technicalDetails, [
      "incubationDays",
      "daysIncubation",
      "giorniIncubazione",
    ]);

    const fruitingDays = getTechnicalValue(item.technicalDetails, [
      "fruitingDays",
      "daysFruiting",
      "giorniFruttificazione",
    ]);

    const humidity = getTechnicalValue(item.technicalDetails, [
      "humidity",
      "humidityPercentage",
      "umidita",
    ]);

    const features: FeatureChip[] = [];

    if (substrate) {
      features.push({
        icon: "🪵",
        label: "Substrato",
        value: substrate,
      });
    }

    if (incubationDays) {
      features.push({
        icon: "🌑",
        label: "Incubazione",
        value: `${incubationDays} gg`,
      });
    }

    if (fruitingDays) {
      features.push({
        icon: "🍄",
        label: "Fruttificazione",
        value: `${fruitingDays} gg`,
      });
    }

    if (humidity) {
      features.push({
        icon: "💧",
        label: "Umidità",
        value: humidity,
      });
    }

    return features;
  }

  if (category.includes("zafferano")) {
    const harvestYear = getTechnicalValue(item.technicalDetails, [
      "harvestYear",
      "year",
      "annoRaccolta",
    ]);

    const dryingMethod = getTechnicalValue(item.technicalDetails, [
      "dryingMethod",
      "metodoEssiccazione",
    ]);

    const pistilsQuantity = getTechnicalValue(item.technicalDetails, [
      "pistilsQuantity",
      "pistils",
      "numeroPistilli",
    ]);

    const qualityCategory = getTechnicalValue(item.technicalDetails, [
      "qualityCategory",
      "category",
      "categoria",
    ]);

    const features: FeatureChip[] = [];

    if (harvestYear) {
      features.push({
        icon: "📅",
        label: "Annata",
        value: harvestYear,
      });
    }

    if (dryingMethod) {
      features.push({
        icon: "🔥",
        label: "Essiccazione",
        value: dryingMethod,
      });
    }

    if (pistilsQuantity) {
      features.push({
        icon: "🌺",
        label: "Pistilli",
        value: pistilsQuantity,
      });
    }

    if (qualityCategory) {
      features.push({
        icon: "🏷️",
        label: "Cat.",
        value: qualityCategory,
      });
    }

    return features;
  }

  if (!item.technicalDetails) return [];

  return Object.entries(item.technicalDetails)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    )
    .map(([key, value]) => ({
      icon: "🧾",
      label: key,
      value: String(value),
    }));
}

function ProductFeatureRail({ item }: { item: AdminOrderItemDTO }) {
  const categoryConfig = getCategoryConfig(item.categoryName);

  const commonFeatures: FeatureChip[] = [
    {
      icon: "📦",
      label: "Quantità",
      value: `${item.quantity} pz`,
    },
    item.netWeight && {
      icon: "⚖️",
      label: "Peso",
      value: `${item.netWeight} ${item.unit ?? ""}`.trim(),
    },
    item.batchCode && {
      icon: "🏷️",
      label: "Lotto",
      value: item.batchCode,
    },
    item.expectedHarvestDate && {
      icon: "✂️",
      label: "Raccolta",
      value: new Intl.DateTimeFormat("it-IT").format(
        new Date(item.expectedHarvestDate),
      ),
    },
  ].filter(Boolean) as FeatureChip[];

  const categoryFeatures = getCategoryFeatures(item);
  const features = [...commonFeatures, ...categoryFeatures];

  return (
    <div className="mt-3 max-w-full overflow-x-auto overscroll-x-contain scrollbar-none [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2 pb-1 pr-4">
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${categoryConfig.badgeClass}`}
        >
          <span className="text-sm leading-none">{categoryConfig.icon}</span>
          <span>{categoryConfig.label}</span>
        </span>

        {features.map((feature) => (
          <span
            key={`${feature.label}-${feature.value}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
          >
            <span className="text-zinc-400">{feature.icon}</span>
            <span className="text-zinc-500">{feature.label}:</span>
            <span className="font-semibold text-zinc-900">{feature.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function OrderItemsPanel({ items }: OrderItemsPanelProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 bg-zinc-50/50 px-4 py-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Riepilogo Articoli in Produzione
        </h2>
      </div>

      <div className="overflow-x-auto">
        <Table className="[--gutter:--spacing(4)] sm:[--gutter:--spacing(5)]">
          <TableHead>
            <TableRow>
              <TableHeader>Prodotto</TableHeader>
              <TableHeader>Categoria</TableHeader>
              <TableHeader>Quantità</TableHeader>
              <TableHeader>Prezzo</TableHeader>
              <TableHeader className="text-right">Etichette</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.orderItemId} className="align-top">
                <TableCell className="min-w-[320px] max-w-130">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-zinc-950">
                      {item.productName}
                    </h3>

                    <p className="mt-0.5 truncate text-xs font-mono uppercase tracking-normal text-zinc-400">
                      SKU {item.skuVariant || "N/A"}
                    </p>

                    <ProductFeatureRail item={item} />
                  </div>
                </TableCell>

                <TableCell className="text-zinc-500">
                  {item.categoryName}
                </TableCell>

                <TableCell className="text-zinc-500">{item.quantity}</TableCell>

                <TableCell className="text-zinc-500">
                  {formatCurrency(item.price)}
                </TableCell>

                <TableCell className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.labelsCount && item.labelsCount > 0
                        ? "border border-blue-100 bg-blue-50 text-blue-700"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    🏷️ {item.labelsCount ?? 0}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
