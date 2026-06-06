import Image from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/types/home";

type HeroProps = {
  content: HeroContent;
};

/**
 * Hero full-width, incollata alla navbar fixed.
 * - Nessun padding laterale sulla <section> (occupa tutta la larghezza)
 * - Il contenuto interno è centrato tramite .hero-inner (definito in globals.css)
 * - .navbar-offset aggiunge padding-top: var(--navbar-height) per scendere sotto la navbar
 */
export function Hero({ content }: HeroProps) {
  return (
    <section className="hero navbar-offset">
      <div className="hero-inner">
        <div className="hero-grid">
          {/* ── Colonna testo ── */}
          <div className="hero-content">
            {content.eyebrow && <p className="eyebrow">{content.eyebrow}</p>}

            <h1
              className="hero-title"
              style={{ marginTop: content.eyebrow ? "14px" : 0 }}
            >
              {content.title}{" "}
              {content.highlightedTitle && (
                <span className="hero-heading-highlight">
                  {content.highlightedTitle}
                </span>
              )}
            </h1>

            <p className="body-text hero-description">{content.description}</p>

            <div className="hero-actions">
              {content.actions.map((action: any) => (
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

          {/* ── Colonna immagine ── */}
          <div className="hero-image-wrapper">
            <Image
              src={content.image.src ?? ""}
              alt={content.image.alt ?? ""}
              fill
              priority
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
