import DesktopFilter from "@/components/filters/desktop-filter";
import PayingGuestList from "@/components/paying-guest/paying-guest-list";
import { FilterConfig } from "@/types/filters";

import { Suspense } from "react";

const filters: FilterConfig[] = [
  {
    filterId: "status",
    filterDisplayName: "Status",
    filterType: "MULTI_SELECT",
    filterOptions: [
      {
        id: "featured",
        displayName: "Featured",
      },
      {
        id: "mostViewed",
        displayName: "Most Viewed",
      },
      {
        id: "mostFavourite",
        displayName: "Most Favourite",
      },
    ],
  },
  {
    filterId: "city",
    filterDisplayName: "City",
    filterType: "SINGLE_SELECT",
    filterOptions: [
      {
        id: "bangalore",
        displayName: "Bangalore",
      },
      {
        id: "majitar",
        displayName: "Majitar",
      },
    ],
  },
  {
    filterId: "amenities",
    filterDisplayName: "Amenities",
    filterOptions: [
      {
        id: "wifi",
        displayName: "High Speed Wi-Fi",
      },
      {
        id: "ac",
        displayName: "Air Conditioning",
      },
      {
        id: "bikeParking",
        displayName: "Bike Parking",
      },
      {
        id: "carParking",
        displayName: "Car Parking",
      },
      {
        id: "laundary",
        displayName: "Laundary",
      },
      {
        id: "security",
        displayName: "24x7 Security",
      },
      {
        id: "gym",
        displayName: "In-House Gym",
      },
      {
        id: "food",
        displayName: "Food Available",
      },
    ],
    filterType: "MULTI_SELECT",
  },
  {
    filterId: "occupancyType",
    filterDisplayName: "Occupancy Type",
    filterType: "MULTI_SELECT",
    filterOptions: [
      {
        id: "singleSharing",
        displayName: "Single Sharing",
      },
      {
        id: "doubleSharing",
        displayName: "Double Sharing",
      },
      {
        id: "trippleSharing",
        displayName: "Tripple Sharing",
      },
    ],
  },
  {
    filterId: "sort",
    filterDisplayName: "Sort By",
    filterType: "SINGLE_SELECT",
    filterOptions: [
      {
        id: "price-asc",
        displayName: "Price (Low to High)",
      },
      {
        id: "price-dsc",
        displayName: "Price (High to Low)",
      },
      {
        id: "rating-dsc",
        displayName: "Ratings (High to Low)",
      },
      {
        id: "reviews-dsc",
        displayName: "Reviews",
      },
    ],
  },
  {
    filterId: "price",
    filterDisplayName: "Budget",
    filterType: "RANGE",
    maxValue: 50000,
    minValue: 1000,
  },
];

// Extract unique filter options
// const locations = Array.from(
//   new Set(featuredProperties.map((p) => p.location))
// );
// const types = Array.from(new Set(featuredProperties.map((p) => p.type)));
// const allAmenities = Array.from(
//   new Set(featuredProperties.flatMap((p) => p.amenities))
// );

export default function Page() {
  // const filters = await getPayingGuestFiltersConfig();
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8 gap-8  ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          All Featured Properties
        </h1>
        <Suspense>
          <DesktopFilter filters={filters} />
        </Suspense>

        {/* Properties Grid */}
        <Suspense>
          <PayingGuestList />
        </Suspense>
      </div>
    </section>
  );
}
