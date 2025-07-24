import { FilterConfig } from "@/types/filters";

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

export { filters };
