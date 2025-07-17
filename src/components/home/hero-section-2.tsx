import { ArrowRight, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Typography from "../ui/typography";

const HeroSection2 = () => {
  return (
    <section className="flex-1 md:flex 2xl:hidden hidden flex-row items-center justify-between full-screen-section w-full">
      <div className="relative flex justify-center flex-1 ">
        <img
          src="/home-hero-2.png"
          className="rounded-md max-w-sm shadow-xl hover:shadow-2xl"
        />
        <div className="bg-white flex flex-row gap-4 items-center p-2 rounded-2xl absolute top-8 left-1">
          <div className="border-2 rounded-xl p-2 bg-primary/30">
            <Video className="text-primary" />
          </div>
          <div>
            <Typography.h4>Free Home tour</Typography.h4>
            <Typography.p>We provide you with Free Home tour</Typography.p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-sm mx-auto">
          <Card className="shadow-xl hover:shadow-2xl">
            <Tabs defaultValue="tenants">
              <CardHeader>
                <TabsList>
                  <TabsTrigger value="tenants">For Tenants</TabsTrigger>
                  <TabsTrigger value="landlord">For Landlords</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="tenants" className="flex flex-col gap-4">
                  <div>
                    <Typography.h4>
                      We make renting simple for tenants.
                    </Typography.h4>
                    <Typography.p>
                      Whether you&apos;re searching for a new place, navigating
                      lease agreements, or transitioning between rentals, we
                      streamline every step of the process. The best part?
                      You&apos;ll save valuable time and money while avoiding
                      the usual headaches of renting.
                    </Typography.p>
                  </div>
                </TabsContent>
                <TabsContent value="landlord">
                  <Typography.h4>
                    We make property management effortless for landlords.
                  </Typography.h4>
                  <Typography.p>
                    From finding reliable tenants and handling lease agreements
                    to streamlining rent collection and property upkeep, we
                    simplify every aspect of the rental process. The best part?
                    You save time, reduce vacancy rates, and maximize your
                    rental income with our efficient services.
                  </Typography.p>
                </TabsContent>
              </CardContent>
              <CardFooter>
                <Button className=" float-right">
                  Connect with us now <ArrowRight></ArrowRight>
                </Button>
              </CardFooter>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
