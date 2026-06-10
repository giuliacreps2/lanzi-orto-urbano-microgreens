import { AudienceSection } from "@/components/home/AudienceSection";
import { Hero } from "@/components/home/Hero";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { audienceContent } from "@/constants/audience";
import { heroContent } from "@/constants/home";
import { VideoSection } from "@/components/home/VideoSection";
import { homeVideos } from "@/constants/video";
import { howItWorksContent } from "@/constants/howItWorks";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PartnerSection } from "@/components/home/PartnerSection";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { getCatalog } from "@/lib/api/products";
import type { ProductCatalogDTO } from "@/types/product-catalog-type";

export default async function House() {
  let products: ProductCatalogDTO[] = [];

  try {
    products = await getCatalog();
  } catch {
    // Se il catalogo fallisce mostriamo la pagina vuota senza bloccare
    console.error("Errore caricamento catalogo");
  }

  return (
    <main>
      <Hero content={heroContent} />
      <HowItWorks content={howItWorksContent} />
      <ProductCarousel
        title="I nostri microgreens"
        description="Piccoli germogli, grande intensità. Scegli la varietà perfetta per ogni piatto."
        products={products}
      />
      <AudienceSection content={audienceContent} />
      <VideoSection
        title="Dal seme al piatto"
        description="Scopri ogni fase del nostro lavoro: dalla semina alla raccolta, fino all'ispirazione in cucina."
        videos={homeVideos}
      />
      <CategoryStrip />
      <PartnerSection />
    </main>
  );
}
