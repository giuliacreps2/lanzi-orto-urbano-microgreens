import Image from "next/image";
import Link from "next/link";

type Category = {
  slug: string;
  label: string;
  image: string;
  imageAlt: string;
  comingSoon?: boolean;
};

const categories: Category[] = [
  {
    slug: "microgreens",
    label: "Microgreens",
    image: "/Categoria Microgreens - Lanzi Orto Urbano.jpg",
    imageAlt: "Vassoio di microgreens freschi",
  },
  {
    slug: "miele",
    label: "Miele",
    image: "/Categoria Miele - Lanzi Orto Urbano.jpg",
    imageAlt: "Vasetti di miele artigianale",
    comingSoon: true,
  },
  {
    slug: "fiori-eduli",
    label: "Fiori Eduli",
    image: "/Categoria Fiori Eduli - Lanzi Orto Urbano.jpg",
    imageAlt: "Fiori eduli colorati",
  },
  {
    slug: "funghi",
    label: "Funghi",
    image: "/shiitake-funghi.jpg",
    imageAlt: "Funghi freschi coltivati",
    comingSoon: true,
  },
];

export function CategoryStrip() {
  return (
    <section className="category-strip">
      <div className="category-strip-inner">
        {/* Header */}
        <div className="category-strip-header">
          <h2 className="section-title text-3xl md:text-4xl">
            Esplora le categorie
          </h2>
        </div>

        {/* Griglia / scroll orizzontale */}
        <div className="category-grid">
          {categories.map((cat) => {
            const Wrapper = cat.comingSoon ? "div" : Link;
            const wrapperProps = cat.comingSoon
              ? {}
              : { href: `/shop?categoria=${cat.slug}` };

            return (
              <Wrapper
                key={cat.slug}
                {...(wrapperProps as any)}
                className={`category-card ${cat.comingSoon ? "category-card--disabled" : "category-card--active"}`}
              >
                {/* Immagine di sfondo */}
                <div className="category-card-image">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay scuro graduale */}
                  <div className="category-card-overlay" />
                </div>

                {/* Badge "In arrivo" */}
                {cat.comingSoon && (
                  <span className="category-badge">In arrivo</span>
                )}

                {/* Label */}
                <span className="category-label">{cat.label}</span>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
