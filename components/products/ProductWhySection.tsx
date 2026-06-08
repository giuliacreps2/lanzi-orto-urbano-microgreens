/**
 * "Perché ti piacerà" — 4 card, scroll orizzontale su mobile
 */

import { Heart, Leaf, Zap, Sparkles } from "lucide-react";
import type { ElementType } from "react";

type WhyCard = {
  icon: ElementType;
  title: string;
  description: string;
};

const WHY_CARDS: WhyCard[] = [
  {
    icon: Heart,
    title: "Gusto deciso e rinfrescante",
    description:
      "Un tocco piccante che esalta ogni preparazione con leggerezza.",
  },
  {
    icon: Leaf,
    title: "Versatile e creativo",
    description:
      "Perfetto per insalate, panini, bowl e impiattamenti d'autore.",
  },
  {
    icon: Zap,
    title: "Freschezza assicurata",
    description:
      "Raccolto al momento giusto per offrirti il massimo del sapore e dei nutrienti.",
  },
  {
    icon: Sparkles,
    title: "Colore che fa la differenza",
    description:
      "Cuoricini porpora e steli rubino per piatti belli quanto buoni.",
  },
];

export function ProductWhySection() {
  return (
    <section className="why-section">
      <div className="why-inner">
        <h2 className="why-title">Perché ti piacerà</h2>

        {/* Scroll orizzontale su mobile, griglia su desktop */}
        <div className="why-grid">
          {WHY_CARDS.map((card) => {
            const Icon = card.icon;
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
