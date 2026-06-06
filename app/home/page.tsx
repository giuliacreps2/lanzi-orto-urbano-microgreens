import { AudienceSection } from "@/components/home/AudienceSection";
import { Hero } from "@/components/home/Hero";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { audienceContent } from "@/constants/audience";
import { heroContent } from "@/constants/home";
import { featuredProducts } from "@/constants/product";
import { VideoSection } from "@/components/home/VideoSection";
import { homeVideos } from "@/constants/video";
import { howItWorksContent } from "@/constants/howItWorks";
import { HowItWorks } from "@/components/home/HowItWorks";
import { B2BPromoSection } from "@/components/home/B2bPromo";
import { b2bPromoContent } from "@/constants/b2bPromo";
import { Navbar } from "@/components/home/Navbar";

export default function House() {
  return (
    <main>
      <Navbar />
      <Hero content={heroContent} />
      <AudienceSection content={audienceContent} />
      {/*<ProductCarousel
        title="I nostri microgreens"
        description="Piccoli germogli, grande intensità. Scegli la varietà perfetta per ogni piatto."
        products={featuredProducts}
      />*/}
      <VideoSection
        title="Dal seme al piatto"
        description="Scopri ogni fase del nostro lavoro: dalla semina alla raccolta, fino all’ispirazione in cucina."
        videos={homeVideos}
      />

      <HowItWorks content={howItWorksContent} />

      <B2BPromoSection content={b2bPromoContent} />
    </main>
  );
}
