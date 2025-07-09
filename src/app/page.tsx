import HeroSection1 from "@/components/home/hero-section-1";
import HeroSection2 from "@/components/home/hero-section-2";
import HeroSection3 from "@/components/home/hero-section-3";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 px-20 items-center justify-center">
      <HeroSection1 />
      <HeroSection2 />
      <HeroSection3 />
    </div>
  );
};

export default Home;
