import { Clock4, Search, ShieldCheck, VerifiedIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import Typography from "../ui/typography";

const HeroSection1 = () => {
  return (
    <section
      id="desktop-hero-1"
      className="flex flex-row items-center justify-between full-screen-section"
    >
      <div className="flex-1 flex flex-col gap-4 justify-between">
        <Typography.h1 className="text-7xl font-extrabold capitalize">
          Find your perfect <span className="text-primary">dream PG</span>
        </Typography.h1>
        <Typography.h3>
          A great platform to buy, sell, or even rent your properties and PG
          without any commisions.
        </Typography.h3>
        <Card className=" shadow-xl hover:shadow-2xl">
          <CardContent className="flex flex-row gap-2">
            <Input
              className="ring-4 focus-visible:ring-4 ring-primary  text-primary font-semibold"
              placeholder="Enter city, area or landmark"
            ></Input>
            <Button className="font-semibold">
              <Search /> Search
            </Button>
          </CardContent>
          <CardFooter className=" justify-between">
            <div className="flex flex-row flex-1 items-center gap-2 font-semibold">
              <VerifiedIcon className="text-green-500 text-xs" /> 100% Verified
              Properties
            </div>
            <div className="flex flex-row items-center gap-2 font-semibold flex-1">
              <Clock4 className="text-green-500 text-xs" />
              24/7 Support
            </div>
            <div className="flex flex-row items-center gap-2 font-semibold flex-1">
              <ShieldCheck className="text-green-500 text-xs" />
              Zero Brokerage
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex-1">
        <img
          src="/home-hero.png"
          className="mx-auto hover:shadow-2xl max-w-sm rounded-2xl  shadow-xl"
          alt="best properties in your location of choice"
        />
      </div>
    </section>
  );
};

export default HeroSection1;
