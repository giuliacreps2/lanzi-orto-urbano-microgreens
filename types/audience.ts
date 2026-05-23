export type AudienceAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
};

export type AudienceIcon = "home" | "utensils";

export type AudienceCard = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  icon: AudienceIcon;
  imagePosition: "left" | "right";
  action: AudienceAction;
};

export type AudienceContent = {
  title: string;
  cards: AudienceCard[];
};