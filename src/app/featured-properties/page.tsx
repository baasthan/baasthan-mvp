"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCards from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

// Extract unique filter options
const types = Array.from(new Set(featuredProperties.map(p => p.type)));
const allAmenities = Array.from(new Set(featuredProperties.flatMap(p => p.amenities)));

export default function FeaturedPropertiesPage() {
  const searchParams = useSearchParams();
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [sort, setSort] = useState("");
  const [budget, setBudget] = useState("");

  // On mount, set filters from query params
  useEffect(() => {
    const bud = searchParams.get("budget") || "";
    setBudget(bud);
  }, [searchParams]);

  // Filtering
  let filtered = featuredProperties.filter(p => {
    const priceNum = parseInt(p.price.replace(/[^\d]/g, ""));
    return (
      (!type || p.type === type) &&
      (!verified || p.verified) &&
      (amenities.length === 0 || amenities.every(a => p.amenities.includes(a))) &&
      (!budget || priceNum <= parseInt(budget))
    );
  });

  // Sorting
  if (sort === "price-asc") {
    filtered = filtered.slice().sort((a, b) => parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, "")));
  } else if (sort === "price-desc") {
    filtered = filtered.slice().sort((a, b) => parseInt(b.price.replace(/[^\d]/g, "")) - parseInt(a.price.replace(/[^\d]/g, "")));
  } else if (sort === "rating-desc") {
    filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
  } else if (sort === "reviews-desc") {
    filtered = filtered.slice().sort((a, b) => b.reviews - a.reviews);
  }

  // Handlers
  const handleAmenityChange = (amenity: string) => {
    setAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  // Add a reset filters handler
  const handleResetFilters = () => {
    setType("");
    setAmenities([]);
    setVerified(false);
    setSort("");
    setBudget("");
  };

  return (
    <section className="py-20 min-h-screen bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm text-center">
            All Featured Properties
          </h1>
          <div className="flex justify-center mt-2 mb-2">
            <span className="block h-1 w-24 rounded-full bg-primary" />
          </div>
          <p className="text-lg text-gray-500 text-center">Browse and filter our handpicked premium PG accommodations.</p>
        </div>
        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-12 items-stretch md:items-end bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200">
          {/* Type */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium mb-1">Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full border rounded px-2 py-2 text-left bg-white">
                  {type ? type : "All"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[150px]">
                <DropdownMenuItem onClick={() => setType("")}>All</DropdownMenuItem>
                {types.map(t => (
                  <DropdownMenuItem key={t} onClick={() => setType(t)}>{t}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Amenities */}
          <div className="min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {allAmenities.map(a => (
                <label key={a} className="flex items-center gap-1 text-xs">
                  <Checkbox
                    checked={amenities.includes(a)}
                    onCheckedChange={() => handleAmenityChange(a)}
                    id={`amenity-${a}`}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Verified */}
          <div className="flex items-center gap-2 min-w-[120px] mt-6">
            <Checkbox id="verified" checked={verified} onCheckedChange={checked => setVerified(!!checked)} />
            <label htmlFor="verified" className="text-sm font-medium">Verified Only</label>
          </div>
          {/* Budget */}
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium mb-1">Max Budget</label>
            <Input
              type="number"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className="w-full"
              placeholder="e.g. 15000"
            />
          </div>
          {/* Sort */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full border rounded px-2 py-2 text-left bg-white">
                  {(() => {
                    if (sort === "price-asc") return "Price: Low to High";
                    if (sort === "price-desc") return "Price: High to Low";
                    if (sort === "rating-desc") return "Rating: High to Low";
                    if (sort === "reviews-desc") return "Most Reviewed";
                    return "Default";
                  })()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[150px]">
                <DropdownMenuItem onClick={() => setSort("")}>Default</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("price-asc")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("price-desc")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("rating-desc")}>Rating: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("reviews-desc")}>Most Reviewed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Reset Filters Button */}
          <div className="flex items-end min-w-[140px] mt-6">
            <Button variant="secondary" className="w-full shadow-md hover:scale-105 transition-transform" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No properties found.</div>
          ) : (
            filtered.map((property) => (
              <div
                key={property.id}
                className="transition-all duration-200 hover:scale-[1.04] hover:shadow-2xl hover:border-primary/60 rounded-2xl shadow-lg border border-gray-200 bg-white/95 group"
              >
                <PropertyCards {...property} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
} 