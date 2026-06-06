import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import file from "@/public/Screenshot 2026-06-06 125233.png";

const benefits = [
  "Consegne puntuali h24",
  "Qualità costante garantita",
  "Personalizzazione del prodotto",
];

type PartnerSectionProps = {
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
};

export function PartnerSection({
  imageSrc = file,
  imageAlt = "Chef che lavora con microgreens",
}: PartnerSectionProps) {
  return (
    <section className="partner-section bg-amber-50">
      <div className="partner-inner">
        {/* ── Immagine ── */}
        <div className="partner-image-wrapper">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="partner-image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ── Contenuto ── */}
        <div className="partner-content">
          <p className="eyebrow">Diventa nostro partner</p>

          <h2 className="partner-title">
            Il partner ideale per la tua cucina.
          </h2>

          <p className="body-text partner-description">
            Ordini programmati, costanza della fornitura tutto l&rsquo;anno e un
            consulente dedicato per studiare mix personalizzati per i tuoi
            piatti signature.
          </p>

          <ul className="partner-checklist">
            {benefits.map((benefit) => (
              <li key={benefit} className="partner-checklist-item">
                <CheckCircle
                  size={20}
                  strokeWidth={1.8}
                  className="partner-check-icon"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Link href="/b2b" className="btn btn-brand partner-cta">
            Richiedi Campionatura Gratuita
          </Link>
        </div>
      </div>
    </section>
  );
}
