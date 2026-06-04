import type {
  AttributeType,
  ProductCategoryMetadata,
  Unit,
} from "@/types/product";

export type CategoryPresetCode = "MICROGREENS" | "HONEY";

export type CategoryAttributePreset = {
  prodCatAttributeKey: string;
  prodCatAttributeLabel: string;
  attrType: AttributeType;
  required: boolean;
  defaultValue?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  unit?: Unit | null;
};

export type CategoryPreset = {
  code: CategoryPresetCode;
  nameProdCategory: string;
  requiresBatchTracking: boolean;
  metadataProdCategory: ProductCategoryMetadata;
  attributes: CategoryAttributePreset[];
};

export const CategoryPresets: Record<CategoryPresetCode, CategoryPreset> = {
  MICROGREENS: {
    code: "MICROGREENS",
    nameProdCategory: "Microgreens",
    requiresBatchTracking: true,
    metadataProdCategory: {
      category: "MICROGREENS",
      label_type: "THERMAL_60X40",
      inventory_logic: {
        decrement_type: "COMPONENTS",
        components: ["seeds", "substrate", "tray", "label", "packaging"],
      },
    },
    attributes: [
      {
        prodCatAttributeKey: "variety",
        prodCatAttributeLabel: "Varietà",
        attrType: "STRING",
        required: true,
        unit: null,
      },
      {
        prodCatAttributeKey: "days_black",
        prodCatAttributeLabel: "Giorni Blackout",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "DAYS",
      },
      {
        prodCatAttributeKey: "days_light",
        prodCatAttributeLabel: "Giorni in luce",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "DAYS",
      },
      {
        prodCatAttributeKey: "days_to_harvest",
        prodCatAttributeLabel: "Giorni alla raccolta",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "DAYS",
      },
      {
        prodCatAttributeKey: "seed_quantity_g",
        prodCatAttributeLabel: "Semi usati per contenitore",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "GRAMS",
      },
      {
        prodCatAttributeKey: "tray_size",
        prodCatAttributeLabel: "Formato contenitore",
        attrType: "STRING",
        required: true,
        unit: null,
      },
      {
        prodCatAttributeKey: "substrate_type",
        prodCatAttributeLabel: "Substrato",
        attrType: "STRING",
        required: false,
        unit: null,
      },
      {
        prodCatAttributeKey: "gross_yield_g",
        prodCatAttributeLabel: "Resa lorda",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
        unit: "GRAMS",
      },
      {
        prodCatAttributeKey: "net_yield_g",
        prodCatAttributeLabel: "Resa netta",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
        unit: "GRAMS",
      },
      {
        prodCatAttributeKey: "shelf_life_days",
        prodCatAttributeLabel: "Shelf life",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
        unit: "DAYS",
      },
      {
        prodCatAttributeKey: "storage_temperature_c",
        prodCatAttributeLabel: "Temperatura conservazione",
        attrType: "NUMBER",
        required: false,
        unit: "CELSIUS",
      },
      {
        prodCatAttributeKey: "no_ogm_badge",
        prodCatAttributeLabel: "Mostra badge NO OGM",
        attrType: "BOOLEAN",
        required: false,
        unit: null,
      },
    ],
  },
  HONEY: {
    code: "HONEY",
    nameProdCategory: "Miele",
    requiresBatchTracking: true,
    metadataProdCategory: {
      category: "HONEY",
      label_type: "JAR_ROUND",
      inventory_logic: {
        decrement_type: "FINISHED_GOOD",
        components: ["bulk_honey", "jar", "cap", "label", "seal"],
      },
    },
    attributes: [
      {
        prodCatAttributeKey: "botanical_source",
        prodCatAttributeLabel: "Origine botanica",
        attrType: "STRING",
        required: true,
        unit: null,
      },
      {
        prodCatAttributeKey: "honey_type",
        prodCatAttributeLabel: "Tipologia miele",
        attrType: "STRING",
        required: true,
        unit: null,
      },
      {
        prodCatAttributeKey: "harvest_region",
        prodCatAttributeLabel: "Regione raccolta",
        attrType: "STRING",
        required: false,
        unit: null,
      },
      {
        prodCatAttributeKey: "harvest_country",
        prodCatAttributeLabel: "Paese di origine",
        attrType: "STRING",
        required: true,
        unit: null,
      },
      {
        prodCatAttributeKey: "net_weight_g",
        prodCatAttributeLabel: "Peso netto",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "GRAMS",
      },
      {
        prodCatAttributeKey: "jar_size_ml",
        prodCatAttributeLabel: "Formato vasetto",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
        unit: "MILLILITERS",
      },
      {
        prodCatAttributeKey: "filtered",
        prodCatAttributeLabel: "Filtrato",
        attrType: "BOOLEAN",
        required: false,
        unit: null,
      },
      {
        prodCatAttributeKey: "heated",
        prodCatAttributeLabel: "Riscaldato",
        attrType: "BOOLEAN",
        required: false,
        unit: null,
      },
      {
        prodCatAttributeKey: "moisture_percent",
        prodCatAttributeLabel: "Umidità",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
        maxValue: 100,
        unit: "PERCENT",
      },
      {
        prodCatAttributeKey: "best_before_date",
        prodCatAttributeLabel: "Termine minimo di conservazione",
        attrType: "DATE",
        required: false,
        unit: null,
      },
      {
        prodCatAttributeKey: "organic_certified",
        prodCatAttributeLabel: "Biologico",
        attrType: "BOOLEAN",
        required: false,
        unit: null,
      },
    ],
  },
};

export const categoryPresetOptions = Object.values(CategoryPresets);
