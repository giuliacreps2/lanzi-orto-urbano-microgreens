import type { AudienceContent, AudienceIcon } from "@/src/types/audience";
import { Button } from "../ui/button";
import Image from "next/image";
import { Home, Utensils } from "lucide-react";
import type { ElementType } from "react";

type AudienceSectionProps = {
  content: AudienceContent;
};

const audienceIcons: Record<AudienceIcon, ElementType> = {
  home: Home,
  utensils: Utensils,
};

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section className="bg-(--color-brand-beige) px-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-8 max-w-3xl text-center section-title-black text-3xl leading-none tracking-[-0.03em] text-(--color-brand-black) md:mb-10 md:text-4xl">
          {content.title}
        </h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {content.cards.map((card) => {
            const Icon = audienceIcons[card.icon];

            return (
              <article
                key={card.title}
                className="relative grid overflow-hidden rounded-[28px] border border-[rgba(184,197,168,0.65)] bg-white shadow-sm md:grid-cols-2"
              >
                <div className="absolute left-5 top-5 z-10 flex size-12 items-center justify-center rounded-full bg-[#dfe8d3] text-(--color-brand-dark) md:left-6 md:top-6">
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                <div
                  className={`relative min-h-52.5 md:min-h-65 ${
                    card.imagePosition === "right" ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center p-7 md:p-8 lg:p-10 ${
                    card.imagePosition === "right" ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h3 className="section-title-black text-3xl leading-none tracking-[-0.03em] text-(--color-brand-black) md:text-4xl">
                    {card.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-(--color-brand-text) md:text-base md:leading-7">
                    {card.description}
                  </p>

                  <Button
                    href={card.action.href}
                    variant={card.action.variant}
                    className="mt-7 w-full sm:w-fit"
                  >
                    {card.action.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
