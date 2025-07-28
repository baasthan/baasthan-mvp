import Cta from "@/components/home/cta";
import FeaturedProperties from "@/components/home/featured-properties";
import HowItWorks from "@/components/home/how-it-works";
import MainHero from "@/components/home/main-hero";
import PopularCities from "@/components/home/popular-cities";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";
import { getPayingGuestInfoByFilters } from "@/repository/paying-guest";
import ListYourPG from "@/components/home/list-your-pg";

export default async function Page() {
  const payingGuestInfo = await getPayingGuestInfoByFilters({});
  return (
    <div className="">
      {/* Hero Section */}
      <MainHero />
      {/* Popular Cities */}
      <PopularCities />
      {/* Featured Properties */}
      {payingGuestInfo && (
        <FeaturedProperties payingGuestInfo={payingGuestInfo} />
      )}

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <Cta />

      {/* List your PG */}
      <ListYourPG />
    </div>
  );
}
