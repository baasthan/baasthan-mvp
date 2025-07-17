"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, Search } from "lucide-react";
import { useState } from "react";

const MainHero = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [budget, setBudget] = useState("");

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect{" "}
            <span className="text-primary">PG Accommodation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover verified PG accommodations across India with transparent
            pricing, genuine reviews, and instant booking.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 shadow-lg border-0 rounded-lg">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Input
                      type="text"
                      icon={Search}
                      placeholder="Enter city or locality"
                      value={searchLocation}
                      onChange={handleLocationChange}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    icon={IndianRupee}
                    placeholder="Budget"
                    value={budget}
                    onChange={handleBudgetChange}
                  />
                </div>
                <Button>
                  <Search />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25K+</div>
              <div className="text-gray-600">Happy Residents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
