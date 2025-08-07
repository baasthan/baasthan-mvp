import Cta from "@/components/home/cta";
import FeaturedProperties from "@/components/home/featured-properties";
import HowItWorks from "@/components/home/how-it-works";
import ListYourPG from "@/components/home/list-your-pg";
import MainHero from "@/components/home/main-hero";
import PopularCities from "@/components/home/popular-cities";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";
import { getPayingGuestInfoByFilters } from "@/repository/paying-guest";

export default async function Page() {
  const payingGuestInfo = await getPayingGuestInfoByFilters({});
  const serealizedPGInfo =
    payingGuestInfo && payingGuestInfo.length !== 0
      ? payingGuestInfo.map((d) => ({
          ...d,
          startingPrice: d.startingPrice.toNumber(),
          maintaince: d.maintaince.toNumber(),
          securityDeposite: d.securityDeposite.toNumber(),
          singleSharingPrice: d.singleSharingPrice.toNumber(),
          doubleSharingPrice: d.doubleSharingPrice.toNumber(),
          trippleShareingPrice: d.trippleShareingPrice.toNumber(),
        }))
      : [];
  return (
    <div className="">
      {/* Hero Section */}
      <MainHero />
      {/* Popular Cities */}
      <PopularCities />
      {/* Featured Properties */}
      {payingGuestInfo && (
        <FeaturedProperties payingGuestInfo={serealizedPGInfo} />
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
