"use client";

import DesktopFilter from "@/components/filters/desktop-filter";
import PropertyCards from "@/components/property-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { ListFilter, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
const locations = Array.from(
  new Set(featuredProperties.map((p) => p.location))
);
const types = Array.from(new Set(featuredProperties.map((p) => p.type)));
const allAmenities = Array.from(
  new Set(featuredProperties.flatMap((p) => p.amenities))
);

export default function FeaturedPropertiesPage() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [sort, setSort] = useState("");
  const [budget, setBudget] = useState("");

  // On mount, set filters from query params
  useEffect(() => {
    const loc = searchParams.get("location") || "";
    const bud = searchParams.get("budget") || "";
    setLocation(loc);
    setBudget(bud);
  }, [searchParams]);

  // Filtering
  let filtered = featuredProperties.filter((p) => {
    const priceNum = parseInt(p.price.replace(/[^\d]/g, ""));
    return (
      (!location ||
        p.location.toLowerCase().includes(location.toLowerCase())) &&
      (!type || p.type === type) &&
      (!verified || p.verified) &&
      (amenities.length === 0 ||
        amenities.every((a) => p.amenities.includes(a))) &&
      (!budget || priceNum <= parseInt(budget))
    );
  });

  // Sorting
  if (sort === "price-asc") {
    filtered = filtered
      .slice()
      .sort(
        (a, b) =>
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
      );
  } else if (sort === "price-desc") {
    filtered = filtered
      .slice()
      .sort(
        (a, b) =>
          parseInt(b.price.replace(/[^\d]/g, "")) -
          parseInt(a.price.replace(/[^\d]/g, ""))
      );
  } else if (sort === "rating-desc") {
    filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
  } else if (sort === "reviews-desc") {
    filtered = filtered.slice().sort((a, b) => b.reviews - a.reviews);
  }

  // Handlers
  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          All Featured Properties
        </h1>
        <div className="flex flex-row gap-4 ">
          <div className="flex-4/5">
            <Input
              icon={Search}
              iconPosition="right"
              placeholder="Select a location"
            />
          </div>
          <div className="flex-1/5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full">
                  <ListFilter />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DesktopFilter />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-4 mb-8 items-end">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium mb-1">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {allAmenities.map((a) => (
                <label key={a} className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() => handleAmenityChange(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
          {/* Verified */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verified"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
            />
            <label htmlFor="verified" className="text-sm font-medium">
              Verified Only
            </label>
          </div>
          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">Max Budget</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border rounded px-2 py-1 w-24"
              placeholder="e.g. 15000"
            />
          </div>
          {/* Sort */}
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="reviews-desc">Most Reviewed</option>
            </select>
          </div>
        </div>
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No properties found.
            </div>
          ) : (
            filtered.map((property) => (
              <PropertyCards {...property} key={property.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
