"use client";

import { useState, useEffect } from "react";
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
import { useAuthStore } from "@/types/store/authStore";
import type { ProductCatalogDTO } from "@/types/product-catalog-type";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Tipi ──────────────────────────────────────────────────────────────────────

type B2bProfile = {
  b2bProfileId: string;
  contactName: string;
  contactSurname: string;
  companyName: string;
  loyaltyPoints: number;
  statusB2b: string;
};

type OrderItemSummary = {
  productName: string;
  quantity: number;
};

type OrderSummary = {
  orderId: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItemSummary[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return `€\u00a0${Number(price).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── ProductRow ────────────────────────────────────────────────────────────────

function ProductRow({ product }: { product: ProductCatalogDTO }) {
  const [qty, setQty] = useState(product.minOrderQuantity ?? 1);
  const min = product.minOrderQuantity ?? 1;

  return (
    <tr className="db-product-row">
      <td className="db-product-cell db-product-cell--name">
        <div className="db-product-identity">
          <div className="db-product-thumb bg-zinc-100" />
          <div>
            <Link
              href={`/products/${product.productSlug}`}
              className="db-product-name-link"
            >
              {product.productName}
            </Link>
            <span className="db-product-format">
              {product.netWeight}
              {product.unit === "GRAMS" ? "g" : product.unit?.toLowerCase()}
            </span>
          </div>
        </div>
      </td>
      <td className="db-product-cell db-product-cell--avail">
        <span className="db-avail-badge">—</span>
      </td>
      <td className="db-product-cell db-product-cell--price">
        <span className="db-price">{formatPrice(Number(product.price))}</span>
        <span className="db-price-note">iva esclusa</span>
      </td>
      <td className="db-product-cell db-product-cell--min">
        <span className="db-min-qty">{min}</span>
      </td>
      <td className="db-product-cell db-product-cell--qty">
        <div className="db-qty-control">
          <button
            onClick={() => setQty(Math.max(min, qty - 1))}
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
      <td className="db-product-cell db-product-cell--action">
        <button
          className="db-add-btn"
          aria-label={`Aggiungi ${product.productName} al carrello`}
        >
          <ShoppingCart size={15} strokeWidth={1.8} />
        </button>
      </td>
    </tr>
  );
}

// ── Pagina principale ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token);
  const setCompanyName = useAuthStore((s) => s.setCompanyName);

  const [profile, setProfile] = useState<B2bProfile | null>(null);
  const [products, setProducts] = useState<ProductCatalogDTO[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function loadDashboard() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const API = process.env.NEXT_PUBLIC_API_URL;

        const [profileRes, catalogRes, ordersRes] = await Promise.all([
          fetch(`${API}/b2b/me`, { headers }),
          fetch(`${API}/products/catalog`, { headers }),
          fetch(`${API}/orders/my`, { headers }),
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
          setCompanyName(profileData.companyName);
        }
        setProfileLoading(false);
        if (catalogRes.ok) setProducts(await catalogRes.json());
        setProductsLoading(false);
        if (ordersRes.ok) {
          const orders: OrderSummary[] = await ordersRes.json();
          if (orders.length > 0) setLastOrder(orders[0]);
        }
        setOrdersLoading(false);
      } catch (err) {
        console.error("Errore caricamento dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  const POINTS_THRESHOLD = 500;
  const points = profile?.loyaltyPoints ?? 0;
  const pointsPct = Math.min(100, (points / POINTS_THRESHOLD) * 100);
  const displayName = profile?.companyName ?? "Cliente B2B";

  if (isLoading) {
    return (
      <>
        <div className="navbar-offset flex items-center justify-center min-h-screen">
          <p className="text-sm text-zinc-500">Caricamento dashboard...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="navbar-offset db-page">
        <div className="db-container">
          {/* ── 1. HERO BAR ── */}
          <section className="db-hero-bar">
            <div className="db-hero-welcome">
              <div className="db-hero-welcome-top">
                {profileLoading ? (
                  <div className="h-6 w-48 bg-zinc-100 rounded-lg animate-pulse" />
                ) : (
                  <h1 className="db-hero-name">
                    Ciao, <span>{displayName}</span>
                  </h1>
                )}
                <span className="db-b2b-badge">Cliente B2B</span>
              </div>
              <div className="db-hero-meta">
                <span className="db-hero-meta-item">
                  <Package size={13} />
                  Referente:{" "}
                  <strong>
                    {profile?.contactName} {profile?.contactSurname}
                  </strong>
                </span>
              </div>
            </div>

            <div className="db-hero-right">
              <div className="db-points-block">
                <div className="db-points-header">
                  <span className="db-points-label">
                    <Star size={13} /> Punti fedeltà
                  </span>
                </div>
                <div className="db-points-bar-wrap">
                  <div className="db-points-bar">
                    <div
                      className="db-points-bar-fill"
                      style={{ width: `${pointsPct}%` }}
                    />
                  </div>
                  <span className="db-points-count">
                    <strong>{points}</strong> / {POINTS_THRESHOLD} pt
                  </span>
                </div>
              </div>

              <div className="db-hero-actions">
                <Button className="btn-primary" href="/products">
                  <ShoppingCart size={15} /> Nuovo ordine
                </Button>
              </div>
            </div>
          </section>

          {/* ── 2. ISPIRAZIONE STAGIONALE — mockup con prodotto reale ── */}
          <section className="db-seasonal">
            <div className="db-seasonal-inner">
              {/* Placeholder verde al posto dell'immagine */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-green)] to-emerald-800" />
              <div className="db-seasonal-overlay" />
              <div className="db-seasonal-content">
                <span className="db-seasonal-eyebrow">
                  In evidenza questa settimana
                </span>
                <h2 className="db-seasonal-title">Microgreens Rucola</h2>
                <p className="db-seasonal-quote">
                  "Perfetti su carpacci, tartare e piatti freddi. Gusto deciso,
                  raccolta fresca."
                </p>
              </div>
              <Button
                href="/products/microgreen-rucola"
                className=" btn-brand db-seasonal-cta"
              >
                Scopri il prodotto <ArrowRight size={15} />
              </Button>
            </div>
          </section>

          {/* ── 2. BENTO GRID ── */}
          <section className="db-bento">
            {/* LEFT — Tabella prodotti */}
            <div className="db-bento-left">
              <div className="db-card">
                <div className="db-card-header">
                  <h2 className="db-card-title">
                    Disponibili questa settimana
                  </h2>
                  <Link href="/products" className="db-link-all">
                    Vedi catalogo completo <ArrowRight size={13} />
                  </Link>
                </div>

                {productsLoading ? (
                  <div className="space-y-3 p-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-10 bg-zinc-100 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <p className="p-4 text-sm text-zinc-500">
                    Nessun prodotto disponibile.
                  </p>
                ) : (
                  <>
                    {/* Tabella desktop */}
                    <div className="hidden sm:block db-table-wrap">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeader>Prodotto</TableHeader>
                            <TableHeader>
                              Prezzo{" "}
                              <span className="font-normal text-zinc-400">
                                (iva esclusa)
                              </span>
                            </TableHeader>
                            <TableHeader>Min.</TableHeader>
                            <TableHeader>Quantità</TableHeader>
                            <TableHeader />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.slice(0, 5).map((p) => (
                            <ProductRow key={p.variantId} product={p} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Lista mobile */}
                    <div className="sm:hidden divide-y divide-zinc-100">
                      {products.slice(0, 5).map((p) => (
                        <div
                          key={p.variantId}
                          className="flex items-center justify-between gap-3 px-4 py-3"
                        >
                          <div className="min-w-0">
                            <Link
                              href={`/products/${p.productSlug}`}
                              className="text-sm font-medium text-zinc-950 hover:underline"
                            >
                              {p.productName}
                            </Link>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              {p.netWeight}
                              {p.unit === "GRAMS"
                                ? "g"
                                : p.unit?.toLowerCase()}{" "}
                              · min {p.minOrderQuantity ?? 1}pz
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-zinc-950">
                              {formatPrice(Number(p.price))}
                            </p>
                            <button className="mt-1 flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-950">
                              <ShoppingCart size={12} /> Aggiungi
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <button className="db-add-selected">
                  <ShoppingCart size={14} />
                  Aggiungi selezionati all'ordine
                </button>
              </div>
            </div>

            {/* RIGHT — Riordino + Consulente */}
            <div className="db-bento-right">
              {/* Riordino rapido */}
              <div className="db-card">
                <div className="db-card-header">
                  <h2 className="db-card-title">Riordino rapido</h2>
                </div>
                {ordersLoading ? (
                  <div className="space-y-2 p-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-6 bg-zinc-100 rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : lastOrder ? (
                  <>
                    <p className="db-reorder-meta">
                      Ultimo ordine {lastOrder.orderNumber} del{" "}
                      {new Date(lastOrder.createdAt).toLocaleDateString(
                        "it-IT",
                        {
                          day: "2-digit",
                          month: "long",
                        },
                      )}
                    </p>
                    <ul className="db-reorder-list">
                      {lastOrder.items.map((item) => (
                        <li key={item.productName} className="db-reorder-item">
                          <span className="db-reorder-dot" />
                          <span>
                            <strong>{item.quantity}x</strong> {item.productName}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="db-reorder-actions">
                      <Button variant="primary" className="w-full">
                        <RefreshCw size={14} /> Riordina uguale
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="p-4 text-sm text-zinc-500">
                    Nessun ordine precedente.
                  </p>
                )}
              </div>

              {/* Consulente dedicato — lasciamo fisso, è un contatto reale */}
              <div className="db-card db-card--consultant mt-5">
                <h2 className="db-card-title">Hai bisogno di aiuto?</h2>
                <p className="db-consultant-sub">
                  Contatta il tuo referente dedicato.
                </p>
                <div className="db-consultant-profile">
                  <div className="db-consultant-avatar">
                    <Image
                      src="/customer-care-man.jpg"
                      alt="Immagine del profilo"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div>
                    <p className="db-consultant-name">Marco Bianchi</p>
                    <p className="db-consultant-role">Account Manager</p>
                  </div>
                </div>
                <div className="db-consultant-contacts">
                  <a href="tel:+393401234567" className="db-contact-link">
                    <Phone size={13} /> +39 340 1234567
                  </a>
                  <a href="mailto:marco@bianchi.it" className="db-contact-link">
                    <Mail size={13} /> marco@bianchi.it
                  </a>
                </div>
                <a
                  href="https://wa.me/393401234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="db-whatsapp-btn"
                >
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
