/**
 * "Come usarlo in cucina" — immagine a sinistra, lista numerata a destra
 * Nessun riquadro sovrapposto sull'immagine
 */

import Image from "next/image";

type HowItem = {
  title: string;
  description: string;
};

const HOW_ITEMS: HowItem[] = [
  {
    title: "Sushi & Sashimi",
    description:
      "Sostituisci la pasta di wasabi con i microgreens freschi per una piccantezza più aromatica e meno invasiva.",
  },
  {
    title: "Power Salads",
    description:
      "Un pugno di senape wasabi nelle tue bowl aggiunge croccantezza e un boost di nutrienti imbattibile.",
  },
  {
    title: "Sandwiches Gourmet",
    description:
      "Perfetto con salmone affumicato, avocado o tacchino arrosto per un contrasto di sapore vivace.",
  },
];

type ProductHowSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export function ProductHowSection({
  imageSrc = "",
  imageAlt = "Come usare i microgreens in cucina",
}: ProductHowSectionProps) {
  return (
    <section className="how-section">
      <div className="how-inner">
        {/* Immagine */}
        <div className="how-image-wrapper">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>

        {/* Contenuto */}
        <div className="how-content">
          <h2 className="partner-title how-title">Come usarlo</h2>

          <ol className="how-list">
            {HOW_ITEMS.map((item, i) => (
              <li key={item.title} className="how-item">
                <span className="how-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="how-item-body">
                  <h3 className="how-item-title">{item.title}</h3>
                  <p className="how-item-desc">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
