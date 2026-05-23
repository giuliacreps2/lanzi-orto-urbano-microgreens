import type { B2BPromoContent } from "../types/b2bPromo";
import file from "@/public/globe.svg"

export const  b2bPromoContent : B2BPromoContent = {
title: "Microgreens per ristoranti, chef e botteghe",
description: "Forniamo microgreens freschi e selezionati per attività food che cercano ingredienti distintivi, locali e facili da integrare nei propri piatti.",
image: {
    src: file,
    alt: "Chef che impiatta con microgreens freschi",
},
decorativeImage: {
    src: file,
    alt: "Dettaglio di microgreens freschi",
},
features:[
    {
        label: "Varietà dedicate e su richiesta",
    },
     {
        label: "Raccolta programmata",
    },
     {
        label: "Formati per uso professionale",
    },
     {
        label: "Disponibilità settimanale",
    },
    {
        label: "Assistenza dedicata e riordini facili",
    },
],
action: {
    label: "Richiedi informazioni B2B",
    href: "/b2b",
    variant: "primary",
},
};