import type { AudienceContent } from "../types/audience";

export const audienceContent: AudienceContent = {
  title: "Scegli come vuoi usare i nostri microgreens",
  cards: [
    {
      title: "Per la tua cucina",
      description:
        "Box fresche, varietà selezionate e consigli per portare colore, gusto e benessere nei tuoi piatti di ogni giorno.",
      image: {
        src: "/pea shots garnish.png",
        alt: "Insalata con microgreens freschi",
      },
      icon: "home",
      imagePosition: "left",
      action: {
        label: "Scopri lo shop",
        href: "/shop",
        variant: "secondary",
      },
    },
    {
      title: "Per la tua attività",
      description:
        "Forniture dedicate per ristoranti, chef, gastronomie e botteghe food. Qualità costante, disponibilità e assistenza dedicata.",
      image: {
        src: "/Erbe-Aromatiche-Chef-Ristoranti-Hotel_16_sdr.jpg",
        alt: "Piatto gourmet con microgreens",
      },
      icon: "utensils",
      imagePosition: "right",
      action: {
        label: "Parliamo della fornitura",
        href: "/b2b",
        variant: "secondary",
      },
    },
  ],
};
