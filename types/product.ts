export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type AvailabilityStatus =
  | "PENDING_DELETE"
  | "IN_STOCK"
  | "AVAILABLE"
  | "UNVAILABLE"
  | "COMING_SOON"
  | "OUT_OF_STOCK";

export type Unit =
  | "MILLIGRAMS"
  | "GRAMS"
  | "KILOGRAMS"
  | "MILLILITERS"
  | "LITERS"
  | "CELSIUS"
  | "PERCENT"
  | "DAYS"
  | "MINUTES"
  | "CURRENCY"
  | "PIECE"
  | "PACK"
  | "PORTTION"
  | "TRAY"
  | "JAR";

export type AttributeType =
  | "STRING"
  | "TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "DATE"
  | "CURRENCY"
  | "ARRAY"
  | "ENUM";

export type ClientCategory = "B2C" | "B2B";

export type ProductCategoryCode = "MICROGREENS" | "HONEY";

export type TechnicalDetails = Record<
  string,
  string | number | boolean | string[] | null
>;

export type ProductCategoryMetadata = {
  category: ProductCategoryCode;
  label_type: string;
  inventory_logi: {
    decrement_type: "COMPONENTS" | "FINISHED_GOOD";
    component: string[];
  };
};

export type ProductCategory = {
  productCategoryId: string;
  nameProdCategory: string;
  requiresBatchTracking: boolean;
  metadataProdCategory?: ProductCategoryMetadata;
};

export type ProductCategoryAttribute = {
  prodCatAttributeId: string;
  prodCatAttributeKey: string;
  prodCatAttributeLabel: string;
  attrType: AttributeType;
  defaultValue?: string | null;
  minValue?: string | null;
  maxValue?: string | null;
  unit: Unit | null;
  productCategory?: ProductCategory;
};

export type Product = {
  productId: string;
  productNmae: string;
  productSlug: string;
  productDescription: string;
  shortProductDescription: string;
  availabilityStatus: AvailabilityStatus;
  productIsAvailable: boolean;
  productStatus: ProductStatus;
  productCategory?: ProductCategory;
};

export type ProductVariant = {
  variantId: string;
  skuVariant: string;
  activeVariant: boolean;
  netWeight: number;
  unit: Unit;
  technicalDeatils?: TechnicalDetails;
  product?: Product;
};

export type PackagingType = {
  packTypeId: string;
  namePackeType: string;
  unitOfMeasure: string;
};

export type PriceList = {
  priceListId: string;
  price: number;
  minOrderQuantity?: number;
  clientCategory: ClientCategory;
};
