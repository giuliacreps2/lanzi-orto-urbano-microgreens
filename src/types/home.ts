export type HeroAction= {
    label: string,
    href: string,
    variant: "primary" | "secondary";
};

export type HeroBenefitIcon = "sprout" | "map-pin" | "leaf";

export type HeroBenefit = {
    icon: HeroBenefitIcon;
    title: string,
    description: string;
};

export type HeroContent = {
    eyebrow?: string,
    title: string,
    highlightedTitle?: string,
    description: string,
    image: {
        src: string,
        alt: string,
    };
    actions: HeroAction[];
    benefits: HeroBenefit[];
};