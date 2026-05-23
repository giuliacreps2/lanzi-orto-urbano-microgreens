import Image from "next/image";
import Link from "next/link";
import { Leaf, MapPin, Sprout } from "lucide-react";
import type { ElementType } from "react";
import type { HeroBenefitIcon, HeroContent} from "@/src/types/home";

type HeroProps = {
  content: HeroContent;
};

const benefitIcons: Record<HeroBenefitIcon, ElementType> = {
  sprout: Sprout,
  "map-pin": MapPin,
  leaf: Leaf,
};

export function Hero({ content }: HeroProps) {
  return (
    <section className="hero">
      <div className="container-page hero-grid">
        <div className="hero-content">
          {content.eyebrow && <p className="eyebrow">{content.eyebrow}</p>}

          <h1 className="hero-title hero-heading">
            {content.title}{" "}
            {content.highlightedTitle && (
              <span className="hero-heading-highlight">
                {content.highlightedTitle}
              </span>
            )}
          </h1>

          <p className="body-text hero-description">{content.description}</p>

          <div className="hero-actions">
            {content.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`btn btn-${action.variant}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hero-image-wrapper">
          <Image
            src={content.image.src }
            alt={content.image.alt }
            fill
            priority
            className="hero-image"
          />
        </div>

        <div className="hero-benefits">
          {content.benefits.map((benefit) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <div key={benefit.title} className="hero-benefit">
                <div className="hero-benefit-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="hero-benefit-title">{benefit.title}</p>
                  <p className="micro-text">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}