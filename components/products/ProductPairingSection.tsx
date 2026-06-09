import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { RelatedProduct } from "@/types/product-types";

export function ProductPairingsSection({
  products,
}: {
  products: RelatedProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="pairings-section">
      <div className="pairings-inner">
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
        <div className="pairings-grid">
          {products.map((product) => (
            <article key={product.slug} className="pairing-card">
              <div className="pairing-card-image-wrapper">
                <div className="pairing-card-image">
                  {product.imageSrc && (
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="pairing-card-placeholder" aria-hidden="true" />
                <button
                  type="button"
                  aria-label={`Aggiungi ${product.name} al carrello`}
                  className="pairing-add-btn"
                >
                  <Plus size={16} strokeWidth={2.2} />
                </button>
              </div>
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
