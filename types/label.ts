export type LabelDTO = {
  labelId: string;
  barCodeGs1: string;
  barcodeData: string;
  productionDate: string;
  bestBeforeDate: string;
  exitDate: string;
  inventoryDecremented: boolean;
  printedAt?: string | null;

  orderItem?: {
    orderItemId: string;
    quantity: number;
    productVariant?: {
      variantId: string;
      skuVariant: string;
      product?: {
        productId: string;
        productName: string;
        category: string;
      };
    };
  };

  batch?: {
    batchId: string;
    batchCode: string;
    statusBatch: string;
    startedAt: string;
    expectedHarvestDate: string;
    actualHarvestDate?: string | null;
    batchMetadata?: {
      supplier_batch_code?: string;
      hive_id?: string;
      [key: string]: any;
    };
  };
};

//PER LA STAMPA
export type PrintableLabel = {
  id: string;
  orderId: string;
  imageUrl: string;
  productName: string;
  category: string;
  batchCode?: string | null;
  productionDate: string;
  exitDate: string;
};
