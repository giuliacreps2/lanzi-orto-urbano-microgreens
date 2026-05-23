export type HowItWorksIcon = "box" | "sprout" | "truck" | "leaf";

export type HowItWoksStep = {
    number: string;
    title: string;
    description: string;
    icon: HowItWorksIcon;
};

export type HowItWorksContent = {
    title: string;
    steps: HowItWoksStep[];
}