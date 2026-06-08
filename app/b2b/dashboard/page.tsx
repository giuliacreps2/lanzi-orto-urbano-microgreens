"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  RefreshCw,
  ArrowRight,
  Phone,
  Mail,
  Star,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardNavbar } from "@/components/b2b/DashboardNavbar";

// ─── Mock data (sostituire con fetch reale) ───────────────────────────────────

const MOCK_USER = {
  name: "Ristorante Demo",
  initials: "RD",
  listino: "Ristoranti Base",
  nextDelivery: "Martedì 10 giugno",
  points: 340,
  pointsThreshold: 500,
  tier: "Cliente Silver",
  cartCount: 2,
};

const MOCK_LAST_ORDER = {
  id: "#1024",
  date: "12 maggio",
  items: [
    { name: "Microgreens Ravanello", qty: 10 },
    { name: "Microgreens Pisello", qty: 10 },
    { name: "Mix Chef", qty: 3 },
  ],
};

// Prodotti disponibili questa settimana
// Struttura pensata per mapparsi su: Product + ProductVariant + PriceList(B2B)
const MOCK_PRODUCTS = [
  {
    id: "mgr-001",
    slug: "microgreens-ravanello",
    name: "Microgreens Ravanello",
    format: "Vaschetta 30g",
    availability: 60,
    priceB2B: 180, // centesimi → €1,80
    minOrder: 10,
    image: {
      src: "",
      alt: "Microgreens Ravanello",
    },
  },
  {
    id: "mgp-001",
    slug: "microgreens-pisello",
    name: "Microgreens Pisello",
    format: "Vaschetta 30g",
    availability: 40,
    priceB2B: 170,
    minOrder: 10,
    image: {
      src: "",
      alt: "Microgreens Pisello",
    },
  },
  {
    id: "mgg-001",
    slug: "microgreens-girasole",
    name: "Microgreens Girasole",
    format: "Vaschetta 30g",
    availability: 25,
    priceB2B: 190,
    minOrder: 10,
    image: {
      src: "",
      alt: "Microgreens Girasole",
    },
  },
  {
    id: "mix-001",
    slug: "mix-chef",
    name: "Mix Chef",
    format: "Vaschette miste",
    availability: 18,
    priceB2B: 850,
    minOrder: 3,
    image: { src: "", alt: "Mix Chef" },
  },
  {
    id: "mie-001",
    slug: "miele-millefiori",
    name: "Miele Millefiori",
    format: "Vaso 500g",
    availability: 30,
    priceB2B: 520,
    minOrder: 6,
    image: {
      src: "",
      alt: "Miele Millefiori",
    },
  },
];

// Helpers
function formatPrice(cents: number) {
  return `€\u00a0${(cents / 100).toFixed(2).replace(".", ",")}`;
}

// ─── Componente tabella prodotti ──────────────────────────────────────────────

function ProductRow({ product }: { product: (typeof MOCK_PRODUCTS)[0] }) {
  const [qty, setQty] = useState(product.minOrder);

  return (
    <tr className="db-product-row">
      {/* Immagine + nome */}
      <td className="db-product-cell db-product-cell--name">
        <div className="db-product-identity">
          <div className="db-product-thumb">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="db-product-name-link"
            >
              {product.name}
            </Link>
            <span className="db-product-format">{product.format}</span>
          </div>
        </div>
      </td>
      {/* Disponibilità */}
      <td className="db-product-cell db-product-cell--avail">
        <span
          className={`db-avail-badge ${product.availability <= 20 ? "db-avail-badge--low" : ""}`}
        >
          {product.availability} pz
        </span>
      </td>
      {/* Prezzo */}
      <td className="db-product-cell db-product-cell--price">
        <span className="db-price">{formatPrice(product.priceB2B)}</span>
        <span className="db-price-note">iva esclusa</span>
      </td>
      {/* Minimo */}
      <td className="db-product-cell db-product-cell--min">
        <span className="db-min-qty">{product.minOrder}</span>
      </td>
      {/* Quantità */}
      <td className="db-product-cell db-product-cell--qty">
        <div className="db-qty-control">
          <button
            onClick={() => setQty(Math.max(product.minOrder, qty - 1))}
            className="db-qty-btn"
            aria-label="Diminuisci"
          >
            −
          </button>
          <span className="db-qty-value">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="db-qty-btn"
            aria-label="Aumenta"
          >
            +
          </button>
        </div>
      </td>
      {/* Aggiungi */}
      <td className="db-product-cell db-product-cell--action">
        <button
          className="db-add-btn"
          aria-label={`Aggiungi ${product.name} al carrello`}
        >
          <ShoppingCart size={15} strokeWidth={1.8} />
        </button>
      </td>
    </tr>
  );
}

// ─── Pagina principale ────────────────────────────────────────────────────────

export default function DashboardPage() {
  const user = MOCK_USER;
  const pointsPct = Math.min(100, (user.points / user.pointsThreshold) * 100);

  return (
    <>
      <DashboardNavbar
        cartCount={user.cartCount}
        userName={user.name}
        userInitials={user.initials}
      />

      <main className="navbar-offset db-page">
        <div className="db-container">
          {/* ── 1. HERO BAR ──────────────────────────────────────────────── */}
          <section className="db-hero-bar">
            {/* Sx: Benvenuto */}
            <div className="db-hero-welcome">
              <div className="db-hero-welcome-top">
                <h1 className="db-hero-name">
                  Ciao, <span>{user.name}</span>
                </h1>
                <span className="db-b2b-badge">Cliente B2B</span>
              </div>
              <div className="db-hero-meta">
                <span className="db-hero-meta-item">
                  <Package size={13} />
                  Listino attivo: <strong>{user.listino}</strong>
                </span>
                <span className="db-hero-meta-sep">·</span>
                <span className="db-hero-meta-item">
                  Prossima consegna: <strong>{user.nextDelivery}</strong>
                </span>
              </div>
            </div>

            {/* Dx: Punti + azioni rapide */}
            <div className="db-hero-right">
              {/* Saldo punti */}
              <div className="db-points-block">
                <div className="db-points-header">
                  <span className="db-points-label">
                    <Star size={13} />
                    Punti fedeltà
                  </span>
                  <span className="db-points-tier">{user.tier}</span>
                </div>
                <div className="db-points-bar-wrap">
                  <div className="db-points-bar">
                    <div
                      className="db-points-bar-fill"
                      style={{ width: `${pointsPct}%` }}
                    />
                  </div>
                  <span className="db-points-count">
                    <strong>{user.points}</strong> / {user.pointsThreshold} pt
                  </span>
                </div>
              </div>

              {/* CTA rapide */}
              <div className="db-hero-actions">
                <Button variant="primary" href="/shop">
                  <ShoppingCart size={15} />
                  Nuovo ordine rapido
                </Button>
                <Button variant="secondary">
                  <RefreshCw size={15} />
                  Riordina ultimo ordine
                </Button>
              </div>
            </div>
          </section>

          {/* ── 2. ISPIRAZIONE STAGIONALE ────────────────────────────────── */}
          <section className="db-seasonal">
            <div className="db-seasonal-inner">
              <Image
                src=""
                alt="Fiori di Borragine"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="db-seasonal-overlay" />
              {/* Contenuto */}
              <div className="db-seasonal-content">
                <span className="db-seasonal-eyebrow">
                  Ispirazione stagionale
                </span>
                <h2 className="db-seasonal-title">Fiori di Borragine</h2>
                <p className="db-seasonal-quote">
                  "Perfetti con gamberi rossi crudi, ostriche e vellutate fredde
                  di piselli."
                </p>
              </div>
              <Button
                variant="brand"
                href="/products/fiori-borragine"
                className="db-seasonal-cta"
              >
                Ordina ora <ArrowRight size={15} />
              </Button>
            </div>
          </section>

          {/* ── 3. BENTO GRID ────────────────────────────────────────────── */}
          <section className="db-bento">
            {/* LEFT — Tabella prodotti disponibili */}
            <div className="db-bento-left">
              <div className="db-card">
                <div className="db-card-header">
                  <h2 className="db-card-title">
                    Disponibili questa settimana
                  </h2>
                  <Link href="/shop" className="db-link-all">
                    Vedi catalogo completo <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="db-table-wrap">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th className="db-th">Prodotto</th>
                        <th className="db-th db-th--center">Disp.</th>
                        <th className="db-th">
                          Prezzo
                          <br />
                          <span className="db-th-sub">(iva esclusa)</span>
                        </th>
                        <th className="db-th db-th--center">Min.</th>
                        <th className="db-th db-th--center">Quantità</th>
                        <th className="db-th" />
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_PRODUCTS.map((p) => (
                        <ProductRow key={p.id} product={p} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="db-add-selected">
                  <ShoppingCart size={14} />
                  Aggiungi selezionati all'ordine
                </button>
              </div>
            </div>

            {/* RIGHT — Riordino rapido + Consulente */}
            <div className="db-bento-right">
              {/* Riordino rapido */}
              <div className="db-card">
                <div className="db-card-header">
                  <h2 className="db-card-title">Riordino rapido</h2>
                </div>
                <p className="db-reorder-meta">
                  Ultimo ordine {MOCK_LAST_ORDER.id} del {MOCK_LAST_ORDER.date}
                </p>
                <ul className="db-reorder-list">
                  {MOCK_LAST_ORDER.items.map((item) => (
                    <li key={item.name} className="db-reorder-item">
                      <span className="db-reorder-dot" />
                      <span>
                        <strong>{item.qty}x</strong> {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="db-reorder-actions">
                  <Button variant="primary" className="w-full">
                    <RefreshCw size={14} />
                    Riordina uguale
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Modifica e riordina
                  </Button>
                </div>
              </div>

              {/* Consulente dedicato */}
              <div className="db-card db-card--consultant">
                <h2 className="db-card-title">Hai bisogno di aiuto?</h2>
                <p className="db-consultant-sub">
                  Contatta il tuo referente dedicato.
                </p>
                <div className="db-consultant-profile">
                  <div className="db-consultant-avatar">
                    <Image
                      src=""
                      alt="Marco Lanzi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="db-consultant-name">Marco Lanzi</p>
                    <p className="db-consultant-role">Account Manager</p>
                  </div>
                </div>
                <div className="db-consultant-contacts">
                  <a href="tel:+393401234567" className="db-contact-link">
                    <Phone size={13} />
                    +39 340 1234567
                  </a>
                  <a href="mailto:marco@lanzi.it" className="db-contact-link">
                    <Mail size={13} />
                    marco@lanzi.it
                  </a>
                </div>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/393401234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="db-whatsapp-btn"
                >
                  {/* WhatsApp icon inline SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contatta su WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
