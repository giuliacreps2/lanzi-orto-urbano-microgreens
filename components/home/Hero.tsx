import Image from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/types/home";

type HeroProps = {
  content: HeroContent;
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

        {content.image?.src && (
          <div className="hero-image-wrapper">
            <Image
              src={content.image.src}
              alt={content.image.alt ?? ""}
              fill
              priority
              className="hero-image"
            />
          </div>
        )}
      </div>
    </section>
  );
}
