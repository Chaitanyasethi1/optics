import React from "react";
import HeroSlider from "@/components/home/HeroSlider";
import BrandStrip from "@/components/home/BrandStrip";
import ShopByCategory from "@/components/home/ShopByCategory";
import TitaniumRow from "@/components/home/TitaniumRow";
import PolarizedRow from "@/components/home/PolarizedRow";
import SpecialOffersRow from "@/components/home/SpecialOffersRow";
import LuxuryBrandsSection from "@/components/home/LuxuryBrandsSection";
import LensesSection from "@/components/home/LensesSection";
import ContactLensesSection from "@/components/home/ContactLensesSection";
import WhyDemoOptics from "@/components/home/WhyDemoOptics";
import ReviewsSlider from "@/components/home/ReviewsSlider";
import InstagramGrid from "@/components/home/InstagramGrid";
import VisitStoreSection from "@/components/home/VisitStoreSection";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero: 4-slide full-width banner */}
      <HeroSlider />

      {/* 2. Brand Strip: 10 luxury brand partners */}
      <BrandStrip />

      {/* 3. Shop by Category: 5 tall image cards */}
      <ShopByCategory />

      {/* 4. Premium Collection: Titanium Frames (4 cards) + View All */}
      <TitaniumRow />

      {/* 5. Polarized Sunglasses (His / Her / Kids) */}
      <PolarizedRow />

      {/* 6. Special Offers: Up to 40% Off */}
      <SpecialOffersRow />

      {/* 7. Luxury Brands: Gucci, Maui Jim, Silhouette, Mont Blanc */}
      <LuxuryBrandsSection />

      {/* 8. Lenses: Zeiss, Essilor, Hoya Single Vision & Progressive */}
      <LensesSection />

      {/* 9. Contact Lenses: Alcon, Bausch & Lomb, CooperVision, Johnson & Johnson */}
      <ContactLensesSection />

      {/* 10. Why DemoOptics: 5 trust pillars on warm beige background */}
      <WhyDemoOptics />

      {/* 11. Customer Reviews: 6 sample reviews with star ratings */}
      <ReviewsSlider />

      {/* 12. Instagram Grid: 6 aesthetic images + Follow Us */}
      <InstagramGrid />

      {/* 13. Visit Our Store: address, timings, map embed, directions */}
      <VisitStoreSection />
    </div>
  );
}
