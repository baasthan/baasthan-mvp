import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PropertyCards from "../property-card";

const FeaturedProperties = () => {
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
  ];
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
          <Button variant={"outline"}>
            View All
            <ArrowRight />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <PropertyCards {...property} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
