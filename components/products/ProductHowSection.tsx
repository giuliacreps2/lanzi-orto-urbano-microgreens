/**
 * "Come usarlo in cucina" — immagine a sinistra, lista numerata a destra
 * Nessun riquadro sovrapposto sull'immagine
 */

import Image from "next/image";
import type { HowItem } from "@/types/product-types";

type Props = {
  items: HowItem[];
  imageSrc?: string;
  imageAlt?: string;
};

export function ProductHowSection({
  items,
  imageSrc = "",
  imageAlt = "Come usare i microgreens in cucina",
}: Props) {
  return (
    <section className="how-section">
      <div className="how-inner">
        <div className="how-image-wrapper">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="how-content">
          <h2 className="partner-title how-title">Come usarlo</h2>
          <ol className="how-list">
            {items.map((item, i) => (
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
