import type { Product } from "../types/product";

export const featuredProducts: Product[] = [
  {
    id: "ravanello",
    name: "Ravanello",
    description: "Gusto fresco e leggermente piccante.",
    price: "€ 3,50",
    image: {
      src: "/images/products/ravanello.jpg",
      alt: "Microgreens di ravanello",
    },
    tags: [{ label: "Piccante" }, { label: "Per insalate" }],
    href: "/prodotti/ravanello",
  },
  {
    id: "daikon",
    name: "Daikon",
    description: "Delicato e croccante, con note dolci.",
    price: "€ 3,50",
    image: {
      src: "/images/products/daikon.jpg",
      alt: "Microgreens di daikon",
    },
    tags: [{ label: "Delicato" }, { label: "Per bowl" }],
    href: "/prodotti/daikon",
  },
  {
    id: "pisello",
    name: "Pisello",
    description: "Dolce e tenero, perfetto per ogni piatto.",
    price: "€ 3,50",
    image: {
      src: "/images/products/pisello.jpg",
      alt: "Microgreens di pisello",
    },
    tags: [{ label: "Delicato" }, { label: "Per pasta" }],
    href: "/prodotti/pisello",
  },
  {
    id: "cavolo-rosso",
    name: "Cavolo Rosso",
    description: "Colore intenso e gusto deciso.",
    price: "€ 3,50",
    image: {
      src: "/images/products/cavolo-rosso.jpg",
      alt: "Microgreens di cavolo rosso",
    },
    tags: [{ label: "Deciso" }, { label: "Per chef" }],
    href: "/prodotti/cavolo-rosso",
  },
  {
    id: "amaranto",
    name: "Amaranto",
    description: "Aromatico e ricco, dalle note terrose.",
    price: "€ 3,50",
    image: {
      src: "/images/products/amaranto.jpg",
      alt: "Microgreens di amaranto",
    },
    tags: [{ label: "Aromatico" }, { label: "Per carne" }],
    href: "/prodotti/amaranto",
  },
];