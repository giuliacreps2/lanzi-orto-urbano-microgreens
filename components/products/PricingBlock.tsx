"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  RefreshCw,
  Truck,
  CalendarClock,
  Minus,
  Plus,
} from "lucide-react";
import type {
  UserRole,
  ProductPageData,
  SubscriptionFrequency,
  DeliveryInfo,
} from "@/types/product-types";
import {
  getPriceForRole,
  getMinOrder,
  subscriptionLabels,
} from "@/types/product-types";

/* ── helpers ─────────────────────────────────────────── */

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
  });
}

/* ── DeliveryBadge ───────────────────────────────────── */

function DeliveryBadge({ delivery }: { delivery: DeliveryInfo }) {
  if (delivery.kind === "harvest") {
    return (
      <div className="pb-flex-row pb-info-badge">
        <CalendarClock size={15} strokeWidth={1.8} className="pb-info-icon" />
        <span>
          Raccolta stimata:{" "}
          <strong>{formatDate(delivery.expectedHarvest)}</strong>
          {" · "}Spedizione subito dopo
        </span>
      </div>
    );
  }
  return (
    <div className="pb-flex-row pb-info-badge">
      <Truck size={15} strokeWidth={1.8} className="pb-info-icon" />
      <span>
        Spedizione entro <strong>{delivery.leadTimeHours}h</strong> dalla
        disponibilità
      </span>
    </div>
  );
}

/* ── QuantitySelector ────────────────────────────────── */

function QuantitySelector({
  value,
  min,
  onChange,
}: {
  value: number;
  min: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="pb-qty-wrapper">
      <button
        type="button"
        aria-label="Diminuisci quantità"
        className="pb-qty-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus size={16} strokeWidth={2} />
      </button>
      <span className="pb-qty-value">{value}</span>
      <button
        type="button"
        aria-label="Aumenta quantità"
        className="pb-qty-btn"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

/* ── PricingBlock ────────────────────────────────────── */

type PricingBlockProps = {
  product: ProductPageData;
  role: UserRole;
};

export function PricingBlock({ product, role }: PricingBlockProps) {
  const isB2B = role === "b2b";
  const isGuest = role === "guest";

  /* Listino corretto in base al ruolo */
  const clientCategory = isB2B ? "B2B" : "B2C";
  const priceEntry = getPriceForRole(product.priceLists, clientCategory);
  const minOrder = getMinOrder(product.priceLists, clientCategory);

  const [qty, setQty] = useState(minOrder);
  const [subscriptionEnabled, setSubscriptionEnabled] = useState(false);
  const [subscriptionFreq, setSubscriptionFreq] =
    useState<SubscriptionFrequency>(
      product.subscriptionFrequencies?.[0] ?? "biweekly",
    );

  if (!priceEntry) return null;

  const unitPrice = priceEntry.price; // in centesimi
  const totalPrice = unitPrice * qty;
  const vatPct = (product.vatRate * 100).toFixed(0);
  const vatLabel = isB2B ? `IVA ${vatPct}% esclusa` : `IVA ${vatPct}% inclusa`;

  /* Label unità di misura dalla variante */
  const unitLabel =
    product.variant.unit === "TRAY"
      ? "vaschetta"
      : product.variant.unit === "JAR"
        ? "vasetto"
        : "confezione";

  return (
    <div className="pb-root">
      {/* ── Prezzo principale ── */}
      <div className="pb-price-section">
        <p className="pb-price-label">
          {isB2B ? "Prezzo unitario ingrosso" : "Prezzo"}
        </p>
        <div className="pb-price-row">
          <span className="pb-price-main">€ {formatPrice(unitPrice)}</span>
          <span className="pb-price-unit">/ {unitLabel}</span>
        </div>
        <p className="pb-vat-note">{vatLabel}</p>
      </div>

      {/* ── Minimo ordine — solo B2B ── */}
      {isB2B && minOrder > 1 && (
        <div className="pb-info-box">
          <div className="pb-flex-row">
            <ShoppingCart
              size={15}
              strokeWidth={1.8}
              className="pb-info-icon"
            />
            <strong className="pb-info-title">Minimo d&rsquo;ordine</strong>
          </div>
          <p className="pb-info-text">
            Ordine minimo:{" "}
            <strong>
              {minOrder} {unitLabel}e
            </strong>
            .
          </p>
        </div>
      )}

      {/* ── Confezionamento (info, non selettore: una sola variante per prodotto) ── */}
      <div className="pb-field">
        <p className="pb-field-label">Confezionamento</p>
        <div className="pb-packaging-info">
          <span className="pb-packaging-badge">
            {product.variant.packagingType.namePackType}
            {" · "}
            {product.variant.netWeight}
            {product.variant.unit === "GRAMS"
              ? "g"
              : product.variant.unit.toLowerCase()}
          </span>
        </div>
      </div>

      {/* ── Riordino automatico — solo B2B ── */}
      {isB2B &&
        product.subscriptionFrequencies &&
        product.subscriptionFrequencies.length > 0 && (
          <div className="pb-field">
            <div className="pb-subscription-toggle-row">
              <p className="pb-field-label" style={{ margin: 0 }}>
                Riordino automatico
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={subscriptionEnabled}
                onClick={() => setSubscriptionEnabled((v) => !v)}
                className={`pb-toggle ${
                  subscriptionEnabled ? "pb-toggle--on" : "pb-toggle--off"
                }`}
              >
                <span className="pb-toggle-thumb" />
              </button>
            </div>

            {subscriptionEnabled && (
              <div className="pb-subscription-freq">
                <p className="pb-field-sublabel">Frequenza consegna</p>
                <select
                  value={subscriptionFreq}
                  onChange={(e) =>
                    setSubscriptionFreq(e.target.value as SubscriptionFrequency)
                  }
                  className="pb-select"
                >
                  {product.subscriptionFrequencies.map((f) => (
                    <option key={f} value={f}>
                      {subscriptionLabels[f]}
                    </option>
                  ))}
                </select>
                <p className="pb-subscription-note">
                  <RefreshCw
                    size={12}
                    strokeWidth={2}
                    style={{ display: "inline", marginRight: 4 }}
                  />
                  Puoi modificare o annullare il riordino dalla tua dashboard.
                </p>
              </div>
            )}
          </div>
        )}

      {/* ── Quantità ── */}
      <div className="pb-field">
        <p className="pb-field-label">Quantità</p>
        <QuantitySelector value={qty} min={minOrder} onChange={setQty} />
      </div>

      {/* ── Totale ── */}
      <div className="pb-total-row">
        <span className="pb-total-label">Totale</span>
        <span className="pb-total-value">€ {formatPrice(totalPrice)}</span>
      </div>

      {/* ── CTA ── */}
      <button
        type="button"
        className="btn btn-brand pb-cta-btn"
        disabled={!product.isAvailable}
      >
        <ShoppingCart size={17} strokeWidth={1.8} />
        {product.isAvailable ? "Aggiungi al carrello" : "Non disponibile"}
      </button>

      {/* ── Banner B2B per guest ── */}
      {isGuest && (
        <div className="pb-b2b-banner">
          <p className="pb-b2b-banner-text">
            Sei un ristorante o un professionista della cucina?
          </p>
          <Link href="/b2b" className="pb-b2b-banner-link">
            Scopri le condizioni B2B →
          </Link>
        </div>
      )}

      {/* ── Info consegna ── */}
      <DeliveryBadge delivery={product.delivery} />
    </div>
  );
}
