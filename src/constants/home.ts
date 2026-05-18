import { HeroContent } from "../types/home";
import file from "@/public/globe.svg"

export const heroContent: HeroContent = {
    eyebrow: "Microgreens freschi coltivati in città",
    title: "Microgreens freschi, coltivati in città",
    highlightedTitle: "per piatti straordinari",
    description: "Coltiviamo microgreens di qualità superiore in ambiente controllato, con cura artigianale e rispetto per l'ambiente.",
    image: {
        src: file,
        alt: "Microgreens freschi raccolti a mano",
    },
actions: [
    {
        label: "Acquista per casa",
        href: "/shop",
        variant: "primary",
    },
    {
        label: "Forniture per B2b",
        href: "/b2b",
        variant: "secondary",
    },
],
benefits: [
    {
        icon: "sprout",
        title: "Freschi ogni giorno",
        description: "Seminati per te",
    },
    {
        icon: "map-pin",
          title: "Ricchi di gusto",
        description: "Più nutrienti più sapore",
    },
       {
        icon: "map-pin",
          title: "Ricchi di gusto",
        description: "Più nutrienti più sapore",
    },
],

};