import { AudienceSection } from "@/src/components/home/AudienceSection";
import { Hero } from "@/src/components/home/Hero";
import { ProductCarousel } from "@/src/components/home/ProductCarousel";
import { audienceContent } from "@/src/constants/audience";
import { heroContent } from "@/src/constants/home";
import { featuredProducts } from "@/src/constants/product";
import { VideoSection } from "@/src/components/home/VideoSection";
import { homeVideos } from "@/src/constants/video";
import { howItWorksContent } from "@/src/constants/howItWorks";
import { HowItWorks } from "@/src/components/home/HowItWorks";
import { B2BPromoSection } from "@/src/components/home/B2bPromo";
import { b2bPromoContent } from "@/src/constants/b2bPromo";

export default function House() {
  return (
    <main>
<Hero content={heroContent}/>
      <AudienceSection content={audienceContent}/>
      <ProductCarousel title="I nostri microgreens"
        description="Piccoli germogli, grande intensità. Scegli la varietà perfetta per ogni piatto."
        products={featuredProducts}/>
           <VideoSection
        title="Dal seme al piatto"
        description="Scopri ogni fase del nostro lavoro: dalla semina alla raccolta, fino all’ispirazione in cucina."
        videos={homeVideos}
      />

      <HowItWorks content= {howItWorksContent}/>

      <B2BPromoSection content= {b2bPromoContent}/>
      </main>
  )
}