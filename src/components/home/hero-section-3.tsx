import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Typography from "../ui/typography";

const TEMP_PROPERTIES = [
  {
    id: "1",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "2",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "3",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "4",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "5",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "6",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "7",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
  {
    id: "8",
    name: "Alpha Homes",
    locationText: "Kormangala, Bangalore",
    aminities: [],
    minPrice: 5000,
  },
];
const HeroSection3 = () => {
  return (
    <section className="flex-1 md:flex 2xl:hidden hidden flex-col items-center gap-4 pt-4 bg-white/50 rounded-md overflow-clip">
      <div>
        <Typography.h1 className="text-primary">
          Explore Properties
        </Typography.h1>
      </div>
      <div className="w-full flex flex-row justify-end px-2">
        <Button asChild>
          <Link href="/explore">
            View all <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="w-5xl">
        <div className="flex flex-row p-2 rounded-2xl  overflow-x-scroll gap-4">
          {TEMP_PROPERTIES.map((properties, index) => (
            <></>
            // <PropertyCard key={index} {...properties} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;
