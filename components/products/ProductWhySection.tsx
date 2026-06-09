/**
 * "Perché ti piacerà" — 4 card, scroll orizzontale su mobile
 */

import { Heart, Leaf, Zap, Sparkles } from "lucide-react";
import type { ElementType } from "react";
import type { WhyCard } from "@/types/product-types";

const ICONS: ElementType[] = [Heart, Leaf, Zap, Sparkles];

export function ProductWhySection({ cards }: { cards: WhyCard[] }) {
  return (
    <section className="why-section">
      <div className="why-inner">
        <h2 className="why-title">Perché ti piacerà</h2>
        <div className="why-grid">
          {cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article key={card.title} className="why-card">
                <div className="why-icon-wrapper">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-desc">{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
