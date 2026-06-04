export type LabelDTO = {
  labelId: string;
  barCodeGs1: string;

  orderItem?: {
    orderItemId: string;
    quantity: number;
    productVariant?: {
      variantId: string;
      skuVariant: string;
      product?: {
        productId: string;
        productName: string;
      };
    };
  };

  batch?: {
    batchId: string;
    batchCode?: string;
    expectedHarvestDate?: string;
  };
};

//PER LA STAMPA
export type PrintableLabel = {
  id: string;
  orderId: string;
  imageUrl: string;
  productName: string;
  batchCode?: string | null;
};
