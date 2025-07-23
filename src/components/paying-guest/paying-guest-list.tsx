"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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

const PayingGuestList = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("searchParams===>", searchParams.toString());
    // Triggre API to receive data with the given query params
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
  );
};

export default PayingGuestList;
