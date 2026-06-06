import { HowItWorksContent, HowItWorksIcon } from "@/types/howItWorks";
import { Box, Leaf, Sprout, Truck } from "lucide-react";
import { ElementType } from "react";

type HowItWorksProps = {
  content: HowItWorksContent;
};

const stepIcons: Record<HowItWorksIcon, ElementType> = {
  box: Box,
  sprout: Sprout,
  truck: Truck,
  leaf: Leaf,
};

export function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section className="bg-(--color-brand-beige) px-5 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-8 max-w-8xl text-left section-title-black text-3xl leading-none tracking-[-0.03em] md:mb-10 md:text-4xl">
          {content.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {content.steps.map((step, index) => {
            const Icon = stepIcons[step.icon];

            return (
              <article key={step.number} className="relative">
                {index !== content.steps.length - 1 && (
                  <>
                    {/* Linea verticale mobile/tablet */}
                    <div className="absolute left-7 top-14 h-[calc(100%+24px)] w-px bg-[rgba(184,197,168,0.85)] lg:hidden" />

                    {/* Linea orizzontale desktop */}
                    <div className="absolute left-16 top-8 hidden h-px w-[calc(100%-48px)] bg-[rgba(184,197,168,0.75)] lg:block" />
                  </>
                )}

                <div className="relative z-10 flex items-start gap-4 lg:block">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-(--color-brand-border) bg-(--color-brand-beige) text-(--color-brand-dark)">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>

                  <div className="pt-1 lg:mt-6 lg:pt-0">
                    <div className="mb-3 flex size-8 items-center justify-center rounded-full border border-(--color-brand-border) bg-(--color-brand-beige) text-sm font-semibold text-(--color-brand-green)">
                      {step.number}
                    </div>

                    <h3 className="max-w-60 text-sm font-bold leading-snug text-(--color-brand-black)">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-70 text-sm leading-6 text-(--color-brand-text)">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
