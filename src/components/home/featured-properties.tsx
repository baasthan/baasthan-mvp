"use client";

import { Button } from "@/components/ui/button";
import { SeriliazedPayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import PayingGuestCard from "../paying-guest/paying-guest-card";

interface FeaturedPropertiesProps {
  visibleCount?: number;
  payingGuestInfo?: SeriliazedPayingGuestInfoWithPublicUser[];
}

/**
 * FeaturedProperties Carousel Component
 *
 * Displays a horizontally scrollable carousel of property cards.
 *
 * Props:
 * @param visibleCount (
 *
 * Example usage:
 *   <FeaturedProperties visibleCount={5} />
 */
const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  visibleCount = 5,
  payingGuestInfo = [],
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const cardWidth = 320;
  const maxIndex = Math.max(
    0,
    Math.ceil(payingGuestInfo.length - visibleCount)
  );

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleLeft = () => {
    const newIndex = Math.max(scrollIndex - 1, 0);
    setScrollIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleRight = () => {
    const newIndex = Math.min(scrollIndex + 1, maxIndex);
    setScrollIndex(newIndex);
    scrollToIndex(newIndex);
  };

  // Optionally, update scrollIndex if user scrolls manually (for arrow disabling)
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setScrollIndex(newIndex);
    }
  };

  // When "View All" is clicked, scroll to the start
  const handleViewAll = () => {
    setScrollIndex(0);
    scrollToIndex(0);
  };

  // Responsive: show 4 in a column on mobile, carousel on desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mobileProperties = payingGuestInfo.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked premium PG accommodations
            </p>
          </div>
          <Link href="/featured-properties">
            <Button variant={"outline"}>
              View All
              <ArrowRight />
            </Button>
          </Link>
        </div>
        {/* Mobile: vertical column, 4 properties */}
        {/* <div className="block md:hidden">
          <div className="flex flex-col gap-6">
            {mobileProperties.map((property) => (
              <PayingGuestCard {...property} key={property.id} />
            ))}
          </div>
        </div> */}
        {/* Desktop: horizontal carousel */}
        <div className="md:hidden flex flex-col gap-4">
          {payingGuestInfo.slice(0, 4).map((property) => (
            <PayingGuestCard {...property} key={property.id} />
          ))}
        </div>
        <div className="hidden md:block relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 disabled:opacity-30"
            onClick={handleLeft}
            disabled={scrollIndex === 0}
            aria-label="Scroll left"
            style={{ display: scrollIndex === 0 ? "none" : "block" }}
          >
            <ArrowLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar p-4"
            style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
            onScroll={handleScroll}
          >
            {payingGuestInfo.map((property) => (
              <PayingGuestCard {...property} key={property.id} />
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 disabled:opacity-30"
            onClick={handleRight}
            disabled={scrollIndex === maxIndex}
            aria-label="Scroll right"
            style={{ display: scrollIndex === maxIndex ? "none" : "block" }}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
