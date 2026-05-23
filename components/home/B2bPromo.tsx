import { B2BPromoContent } from "@/src/types/b2bPromo";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

type B2bPromoSectionProps = {
  content: B2BPromoContent;
};

export function B2BPromoSection({ content }: B2bPromoSectionProps) {
  return (
    <section className="bg-[var(--color-brand-beige)] px-5 mt-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 overflow-hidden border-y border-[rgba(184,197,168,0.65)] bg-white lg:grid-cols-[1fr_1fr]">
        <div className="relative min-h-[260px] lg:min-h-[380px]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            className="object-fill"
          />
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
          <h2 className="max-w-xl section-title-black text-4xl font-medium leading-14 tracking-[-0.035em] md:text-5xl">
            {content.title}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--color-brand-text)] md:text-base md:leading-7">
            {content.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.features.map((feature) => (
              <div key={feature.label} className="flex items-start gap-2">
                <Check
                  size={16}
                  strokeWidth={2}
                  className="mt-1 shrink-0 text-[var(--color-brand-green)]"
                />
                <p className="text-sm leading-5 text-[var(--color-brand-text)]">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>

          <Button
            href={content.action.href}
            variant={content.action.variant}
            className="mt-8 w-full sm:w-fit"
          >
            {content.action.label}
          </Button>
        </div>

        {/*} {content.decorativeImage && (
          <div className="relative hidden min-h-[380px] lg:block">
            <Image
              src={content.decorativeImage.src}
              alt={content.decorativeImage.alt}
              fill
              className="object-cover"
            />
          </div>
        )}*/}
      </div>
    </section>
  );
}
