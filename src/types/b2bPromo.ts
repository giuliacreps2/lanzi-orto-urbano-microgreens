export type B2BPromoFeature = {
    label: string;
};

export type B2BPromoContent = {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
    decorativeImage?: {
        src: string;
        alt: string;
    };
    features: B2BPromoFeature[];
    action: {
        label: string;
        href: string;
        variant: "primary" | "secondary" | "ghost";
    };
};