export type OrderStatus =
  | "COMPLETED"
  | "PENDING"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type SourceOrder =
  | "CUSTOMER_SELF"
  | "ADMIN_MANUAL"
  | "SUBSCRIPTION_AUTO";

export type DeliveryType = "HOME_DELIVERY" | "PICKUP_UP" | "EXPRESS_COURIER";

export type AdminOrderCustomerDTO = {
  customerType: "B2C" | "B2B";
  name: string;
  email?: string | null;
  phone?: string | null;
  companyName?: string | null;
  address?: string | null;
};

export type AdminOrderDeliveryDTO = {
  recipientName: string;
  deliveryDate?: string | null;
  statusDeliveryType?: string | null;
  shippingAddress?: Record<string, unknown> | null;
};

export type AdminOrderItemDTO = {
  orderItemId: string;
  quantity: number;
  price: number;

  productName: string;
  categoryName: string;
  variantId: string;
  skuVariant: string;
  netWeight?: number | null;
  unit?: string | null;

  batchId: string;
  batchCode?: string | null;
  expectedHarvestDate?: string | null;

  technicalDetails?: Record<string, unknown> | null;
  labelsCount?: number | null;
};

export type AdminOrderDetailDTO = {
  orderId: string;
  orderNumber: string;
  statusOrder: OrderStatus;
  sourceOrder: SourceOrder;
  deliveryType: DeliveryType;
  orderCreatedAt: string;
  orderUpdatedAt?: string | null;
  totalAmount: number;
  orderNotes?: string | null;

  customer: AdminOrderCustomerDTO;
  delivery: AdminOrderDeliveryDTO;
  items: AdminOrderItemDTO[];
};

//DATI DASHBOARD
export type AdminOrderRowDTO = {
  orderId: string;
  orderNumber?: string;
  statusOrder: OrderStatus;
  sourceOrder: SourceOrder;
  deliveryType: DeliveryType;
  orderCreatedAt: string;
  totalAmount: number;

  customerName?: string;
  customerType?: "B2C" | "B2B";
  itemsCount?: number;
};
