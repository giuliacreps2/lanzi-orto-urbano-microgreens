/**
 * "Abbinamenti consigliati" — card con +, nome, descrizione, prezzo
 * Scroll orizzontale su mobile, griglia su desktop
 */

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

type PairingProduct = {
  slug: string;
  name: string;
  description: string;
  price: string; // già formattato: "€ 4,50"
  imageSrc: string;
  imageAlt: string;
};

const PAIRINGS: PairingProduct[] = [
  {
    slug: "microgreen-senape-rossa",
    name: "Senape Rossa",
    description: "Earthy & Spicy — perfetta in contrasto con sapori delicati.",
    price: "€ 4,50",
    imageSrc: "/images/products/senape-rossa.jpg",
    imageAlt: "Microgreens Senape Rossa",
  },
  {
    slug: "microgreen-crescione",
    name: "Crescione",
    description: "Peppery & Sharp — ideale su carpacci e tartare.",
    price: "€ 4,50",
    imageSrc: "/images/products/crescione.jpg",
    imageAlt: "Microgreens Crescione",
  },
  {
    slug: "microgreen-basilico",
    name: "Basilico",
    description: "Dolce & Aromatico — l'abbinamento classico reinterpretato.",
    price: "€ 5,00",
    imageSrc: "/images/products/basilico.jpg",
    imageAlt: "Microgreens Basilico",
  },
];

export function ProductPairingsSection() {
  return (
    <section className="pairings-section">
      <div className="pairings-inner">
        {/* Header */}
        <div className="pairings-header">
          <div>
            <h2 className="pairings-title">Abbinamenti consigliati</h2>
            <p className="small-text" style={{ marginTop: 4 }}>
              Prodotti che amano stare insieme.
            </p>
          </div>
          <Link href="/shop" className="pairings-link-all">
            Vedi tutti →
          </Link>
        </div>

        {/* Card list */}
        <div className="pairings-grid">
          {PAIRINGS.map((product) => (
            <article key={product.slug} className="pairing-card">
              {/* Immagine + bottone + */}
              <div className="pairing-card-image-wrapper">
                <div className="pairing-card-image">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Placeholder se immagine non disponibile */}
                <div className="pairing-card-placeholder" aria-hidden="true" />

                {/* Bottone + aggiungi */}
                <button
                  type="button"
                  aria-label={`Aggiungi ${product.name} al carrello`}
                  className="pairing-add-btn"
                >
                  <Plus size={16} strokeWidth={2.2} />
                </button>
              </div>

              {/* Info */}
              <div className="pairing-card-body">
                <Link
                  href={`/products/${product.slug}`}
                  className="pairing-card-name"
                >
                  {product.name}
                </Link>
                <p className="pairing-card-desc">{product.description}</p>
                <p className="pairing-card-price">{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
