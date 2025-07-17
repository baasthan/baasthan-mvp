"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import PropertyCards from "../property-card";

interface FeaturedPropertiesProps {
  visibleCount?: number;
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
const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ visibleCount = 3 }) => {
  const featuredProperties = [
    {
      id: 1,
      name: "Elite Residency",
      location: "Koramangala, Bangalore",
      price: "₹12,000",
      rating: 4.8,
      reviews: 124,
      image: "/pg-images/elite.png?height=200&width=300",
      amenities: ["WiFi", "AC", "Parking", "Food"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 2,
      name: "Urban Nest",
      location: "Gurgaon, Delhi NCR",
      price: "₹15,000",
      rating: 4.6,
      reviews: 89,
      image: "/pg-images/urban.png?height=200&width=300",
      amenities: ["WiFi", "Gym", "Food", "Laundry"],
      type: "Shared Room",
      verified: true,
      liked: true,
    },
    {
      id: 3,
      name: "Comfort Zone",
      location: "Bandra, Mumbai",
      price: "₹18,000",
      rating: 4.9,
      reviews: 156,
      image: "/pg-images/comfort.png",
      amenities: ["WiFi", "AC", "Food", "Security"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 4,
      name: "Student Hub",
      location: "Anna Nagar, Chennai",
      price: "₹10,000",
      rating: 4.5,
      reviews: 67,
      image: "/pg-images/sikkim.png",
      amenities: ["WiFi", "Study Room", "Food", "AC"],
      type: "Shared Room",
      verified: true,
      liked: false,
    },
    // Additional dummy properties
    {
      id: 5,
      name: "Green Acres",
      location: "Salt Lake, Kolkata",
      price: "₹13,500",
      rating: 4.7,
      reviews: 102,
      image: "/pg-images/elite.png?height=200&width=300",
      amenities: ["WiFi", "AC", "Parking", "Food"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 6,
      name: "Metro Heights",
      location: "Hitech City, Hyderabad",
      price: "₹16,000",
      rating: 4.8,
      reviews: 98,
      image: "/pg-images/urban.png?height=200&width=300",
      amenities: ["WiFi", "Gym", "Food", "Laundry"],
      type: "Shared Room",
      verified: true,
      liked: true,
    },
    {
      id: 7,
      name: "Sunrise Villa",
      location: "Viman Nagar, Pune",
      price: "₹14,000",
      rating: 4.6,
      reviews: 110,
      image: "/pg-images/comfort.png",
      amenities: ["WiFi", "AC", "Food", "Security"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 8,
      name: "Cityscape PG",
      location: "Sector 62, Noida",
      price: "₹11,500",
      rating: 4.4,
      reviews: 75,
      image: "/pg-images/sikkim.png",
      amenities: ["WiFi", "Study Room", "Food", "AC"],
      type: "Shared Room",
      verified: true,
      liked: false,
    },
    {
      id: 9,
      name: "Lakeview Residency",
      location: "Powai, Mumbai",
      price: "₹19,000",
      rating: 4.9,
      reviews: 160,
      image: "/pg-images/elite.png?height=200&width=300",
      amenities: ["WiFi", "AC", "Parking", "Food"],
      type: "Single Room",
      verified: true,
      liked: true,
    },
    {
      id: 10,
      name: "Royal Stay",
      location: "Jayanagar, Bangalore",
      price: "₹17,000",
      rating: 4.7,
      reviews: 120,
      image: "/pg-images/urban.png?height=200&width=300",
      amenities: ["WiFi", "Gym", "Food", "Laundry"],
      type: "Shared Room",
      verified: true,
      liked: false,
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const cardWidth = 320; 
  const maxIndex = featuredProperties.length - visibleCount;

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

  // When "View All" is clicked, scroll to the start
  const handleViewAll = () => {
    setScrollIndex(0);
    scrollToIndex(0);
  };

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
          <Button variant={"outline"} onClick={handleViewAll}>
            View All
            <ArrowRight />
          </Button>
        </div>
        <div className="relative">
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
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                style={{ minWidth: cardWidth, maxWidth: cardWidth }}
                className="flex-shrink-0"
              >
                <PropertyCards {...property} />
              </div>
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
