export type ProductTag = {
  label: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
  tags: ProductTag[];
  href: string;
};