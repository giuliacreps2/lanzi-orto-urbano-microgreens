import type { AttributeType, ProductCategoryMetadata } from "@/types/product";

export type CategoryPresetCode = "MICROGREENS" | "HONEY";

export type CategoryAttributePreset = {
  prodCatAttributeKey: string;
  prodCatAttributeLabel: string;
  attrType: AttributeType;
  required: boolean;
  defaultValue?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  unit?: string | null;
};

// Attributi comuni a tutte le categorie
const COMMON_ATTRIBUTES: CategoryAttributePreset[] = [
  // Conservazione
  {
    prodCatAttributeKey: "shelf_life_days",
    prodCatAttributeLabel: "Shelf life (giorni)",
    attrType: "NUMBER",
    required: false,
    minValue: 0,
  },
  {
    prodCatAttributeKey: "storage_temperature_c",
    prodCatAttributeLabel: "Temperatura conservazione (°C)",
    attrType: "NUMBER",
    required: false,
  },
  {
    prodCatAttributeKey: "storage",
    prodCatAttributeLabel: "Indicazioni conservazione",
    attrType: "STRING",
    required: false,
  },
  // Scheda cliente — Dettagli
  {
    prodCatAttributeKey: "flavor",
    prodCatAttributeLabel: "Gusto",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "color",
    prodCatAttributeLabel: "Colore",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "texture",
    prodCatAttributeLabel: "Texture",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "nutrients",
    prodCatAttributeLabel: "Ricco di",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "origin",
    prodCatAttributeLabel: "Origine",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "taste_notes",
    prodCatAttributeLabel: "Note di sapore",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "intensity",
    prodCatAttributeLabel: "Intensità (1-5)",
    attrType: "NUMBER",
    required: false,
    minValue: 1,
    maxValue: 5,
  },
  {
    prodCatAttributeKey: "certifications",
    prodCatAttributeLabel: "Certificazioni",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "pairings",
    prodCatAttributeLabel: "Abbinamenti in cucina",
    attrType: "STRING",
    required: false,
  },
  // Perché ti piacerà
  {
    prodCatAttributeKey: "benefit_1_title",
    prodCatAttributeLabel: "Beneficio 1 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_1_text",
    prodCatAttributeLabel: "Beneficio 1 - Testo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_2_title",
    prodCatAttributeLabel: "Beneficio 2 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_2_text",
    prodCatAttributeLabel: "Beneficio 2 - Testo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_3_title",
    prodCatAttributeLabel: "Beneficio 3 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_3_text",
    prodCatAttributeLabel: "Beneficio 3 - Testo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_4_title",
    prodCatAttributeLabel: "Beneficio 4 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "benefit_4_text",
    prodCatAttributeLabel: "Beneficio 4 - Testo",
    attrType: "STRING",
    required: false,
  },
  // Come usarlo
  {
    prodCatAttributeKey: "use_1_title",
    prodCatAttributeLabel: "Utilizzo 1 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "use_1_text",
    prodCatAttributeLabel: "Utilizzo 1 - Testo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "use_2_title",
    prodCatAttributeLabel: "Utilizzo 2 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "use_2_text",
    prodCatAttributeLabel: "Utilizzo 2 - Testo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "use_3_title",
    prodCatAttributeLabel: "Utilizzo 3 - Titolo",
    attrType: "STRING",
    required: false,
  },
  {
    prodCatAttributeKey: "use_3_text",
    prodCatAttributeLabel: "Utilizzo 3 - Testo",
    attrType: "STRING",
    required: false,
  },
];

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
      // Tecnici specifici microgreens
      {
        prodCatAttributeKey: "variety",
        prodCatAttributeLabel: "Varietà",
        attrType: "STRING",
        required: true,
      },
      {
        prodCatAttributeKey: "days_black",
        prodCatAttributeLabel: "Giorni Blackout",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "days_light",
        prodCatAttributeLabel: "Giorni in luce",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "days_to_harvest",
        prodCatAttributeLabel: "Giorni alla raccolta",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "seed_quantity_g",
        prodCatAttributeLabel: "Semi per contenitore",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "tray_size",
        prodCatAttributeLabel: "Formato contenitore",
        attrType: "STRING",
        required: true,
      },
      {
        prodCatAttributeKey: "substrate_type",
        prodCatAttributeLabel: "Substrato",
        attrType: "STRING",
        required: false,
      },
      {
        prodCatAttributeKey: "gross_yield_g",
        prodCatAttributeLabel: "Resa lorda",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "net_yield_g",
        prodCatAttributeLabel: "Resa netta",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "expected_harvest",
        prodCatAttributeLabel: "Giorni stimati alla raccolta",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "no_ogm_badge",
        prodCatAttributeLabel: "Mostra badge NO OGM",
        attrType: "BOOLEAN",
        required: false,
      },
      // Comuni
      ...COMMON_ATTRIBUTES,
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
      // Tecnici specifici miele
      {
        prodCatAttributeKey: "botanical_source",
        prodCatAttributeLabel: "Origine botanica",
        attrType: "STRING",
        required: true,
      },
      {
        prodCatAttributeKey: "honey_type",
        prodCatAttributeLabel: "Tipologia miele",
        attrType: "STRING",
        required: true,
      },
      {
        prodCatAttributeKey: "harvest_region",
        prodCatAttributeLabel: "Regione raccolta",
        attrType: "STRING",
        required: false,
      },
      {
        prodCatAttributeKey: "harvest_country",
        prodCatAttributeLabel: "Paese di origine",
        attrType: "STRING",
        required: true,
      },
      {
        prodCatAttributeKey: "jar_size_ml",
        prodCatAttributeLabel: "Formato vasetto",
        attrType: "NUMBER",
        required: true,
        minValue: 0,
      },
      {
        prodCatAttributeKey: "filtered",
        prodCatAttributeLabel: "Filtrato",
        attrType: "BOOLEAN",
        required: false,
      },
      {
        prodCatAttributeKey: "heated",
        prodCatAttributeLabel: "Riscaldato",
        attrType: "BOOLEAN",
        required: false,
      },
      {
        prodCatAttributeKey: "moisture_percent",
        prodCatAttributeLabel: "Umidità",
        attrType: "NUMBER",
        required: false,
        minValue: 0,
        maxValue: 100,
      },
      {
        prodCatAttributeKey: "best_before_date",
        prodCatAttributeLabel: "Termine minimo conservazione",
        attrType: "DATE",
        required: false,
      },
      {
        prodCatAttributeKey: "organic_certified",
        prodCatAttributeLabel: "Biologico certificato",
        attrType: "BOOLEAN",
        required: false,
      },
      // Comuni
      ...COMMON_ATTRIBUTES,
    ],
  },
};

export const categoryPresetOptions = Object.values(CategoryPresets);
