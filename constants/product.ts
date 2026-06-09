import type { Product } from "../types/product";

export const featuredProducts: Product[] = [
  {
    productId: "11111111-1111-1111-1111-111111111111",
    productName: "Rucola",
    productSlug: "/products/microgreen-rucola",
    productDescription:
      "Microgreens di Ravanello freschi coltivati in idroponica urbana.",
    shortProductDescription: "Gusto fresco e leggermente piccante.",
    availabilityStatus: "IN_STOCK",
    productIsAvailable: true,
    productStatus: "ACTIVE",
    productCategory: {
      productCategoryId: "cat-microgreens",
      nameProdCategory: "Microgreens",
      requiresBatchTracking: true,
    },
    // Estendiamo l'oggetto inline con i campi grafici che servono alla tua Card
    // (image, tags, href) usando un cast sicuro o lasciandoli liberi se usi una card flessibile
    ...({
      image: {
        src: "/images/products/ravanello.jpg",
        alt: "Microgreens di ravanello",
      },
      tags: [{ label: "Piccante" }, { label: "Per insalate" }],
      href: "/products/microgreen-rucola",
      price: "3,50", // Se la card leggeva direttamente questa stringa per la conversione rapida
    } as any),
  },
  {
    productId: "22222222-2222-2222-2222-222222222222",
    productName: "Daikon",
    productSlug: "daikon",
    productDescription:
      "Microgreens di Daikon croccanti, ideali per completare ogni piatto.",
    shortProductDescription: "Delicato e croccante, con note dolci.",
    availabilityStatus: "IN_STOCK",
    productIsAvailable: true,
    productStatus: "ACTIVE",
    productCategory: {
      productCategoryId: "cat-microgreens",
      nameProdCategory: "Microgreens",
      requiresBatchTracking: true,
    },
    ...({
      image: {
        src: "/images/products/daikon.jpg",
        alt: "Microgreens di daikon",
      },
      tags: [{ label: "Delicato" }, { label: "Per bowl" }],
      href: "/prodotti/daikon",
      price: "3,50",
    } as any),
  },
  {
    productId: "33333333-3333-3333-3333-333333333333",
    productName: "Pisello",
    productSlug: "pisello",
    productDescription:
      "Microgreens di Pisello dolci e teneri, ricchi di nutrienti.",
    shortProductDescription: "Dolce e tenero, perfetto per ogni piatto.",
    availabilityStatus: "IN_STOCK",
    productIsAvailable: true,
    productStatus: "ACTIVE",
    productCategory: {
      productCategoryId: "cat-microgreens",
      nameProdCategory: "Microgreens",
      requiresBatchTracking: true,
    },
    ...({
      image: {
        src: "/images/products/pisello.jpg",
        alt: "Microgreens di pisello",
      },
      tags: [{ label: "Delicato" }, { label: "Per pasta" }],
      href: "/prodotti/pisello",
      price: "3,50",
    } as any),
  },
  {
    productId: "44444444-4444-4444-4444-444444444444",
    productName: "Cavolo Rosso",
    productSlug: "cavolo-rosso",
    productDescription:
      "Microgreens di Cavolo Rosso dall'impatto visivo eccezionale.",
    shortProductDescription: "Colore intenso e gusto deciso.",
    availabilityStatus: "IN_STOCK",
    productIsAvailable: true,
    productStatus: "ACTIVE",
    productCategory: {
      productCategoryId: "cat-microgreens",
      nameProdCategory: "Microgreens",
      requiresBatchTracking: true,
    },
    ...({
      image: {
        src: "/images/products/cavolo-rosso.jpg",
        alt: "Microgreens di cavolo rosso",
      },
      tags: [{ label: "Deciso" }, { label: "Per chef" }],
      href: "/prodotti/cavolo-rosso",
      price: "3,50",
    } as any),
  },
  {
    productId: "55555555-5555-5555-5555-555555555555",
    productName: "Amaranto",
    productSlug: "amaranto",
    productDescription:
      "Microgreens di Amaranto dal colore rosso porpora profondo.",
    shortProductDescription: "Aromatico e ricco, dalle note terrose.",
    availabilityStatus: "IN_STOCK",
    productIsAvailable: true,
    productStatus: "ACTIVE",
    productCategory: {
      productCategoryId: "cat-microgreens",
      nameProdCategory: "Microgreens",
      requiresBatchTracking: true,
    },
    ...({
      image: {
        src: "/images/products/amaranto.jpg",
        alt: "Microgreens di amaranto",
      },
      tags: [{ label: "Aromatico" }, { label: "Per carne" }],
      href: "/prodotti/amaranto",
      price: "3,50",
    } as any),
  },
];
