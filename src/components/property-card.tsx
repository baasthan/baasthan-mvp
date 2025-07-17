import { Button } from "@/components/ui/button";
import { Heart, MapPin, Share2, Star } from "lucide-react";

export interface PropertyCardProps {
  id: number;
  name: string;
  location: string;
  price: string;
  rating?: number;
  reviews?: number;
  image: string;
  amenities: string[];
  type?: string;
  verified?: boolean;
  liked?: boolean;
}

const PropertyCards = ({
  id,
  amenities,
  image,
  location,
  name,
  price,
  liked = false,
  rating = 0,
  reviews = 0,
  type = "N/A",
  verified = false,
}: PropertyCardProps) => {
  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-md border-0 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between pb-4"
    >
      <div className="flex flex-col gap-4 ">
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            {verified && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size={"icon"}
              variant={"accent"}
              className={`size-8 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            >
              <Heart size={8} className={`${liked ? "fill-red-500" : ""}`} />
            </Button>
            <Button size={"icon"} variant={"accent"} className="size-8">
              <Share2 size={8} />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 text-gray-900 px-2 py-1 rounded-md text-xs font-medium">
              {type}
            </span>
          </div>
        </div>

        <div className="px-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{price}</div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center ">
              <Star size={12} className="fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-medium ml-1">{rating}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviews} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-4">
        <Button className="w-full">View Details</Button>
      </div>
    </div>
  );
};

export default PropertyCards;
