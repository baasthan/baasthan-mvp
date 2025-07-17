import Cta from "@/components/home/cta";
import FeaturedProperties from "@/components/home/featured-properties";
import HowItWorks from "@/components/home/how-it-works";
import MainHero from "@/components/home/main-hero";
import PopularCities from "@/components/home/popular-cities";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function Page() {
  return (
    <div className="">
      {/* Hero Section */}
      <MainHero />
      {/* Popular Cities */}
      <PopularCities />
      {/* Featured Properties */}
      <FeaturedProperties />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <Cta />
    </div>
  );
}
