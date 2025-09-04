import { JSX } from "react";
import HeroSection from "@/components/homePage/HeroSection";
import FeaturesSection from "@/components/homePage/FeaturesSection";
import HowItWorksSection from "@/components/homePage/HowItWorksSection";

function HomePage(): JSX.Element {
  return (
    <div className="w-full">

      {/* hero section */}
      <HeroSection />

      {/* features section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

    </div>
  );
}

export default HomePage