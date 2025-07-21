"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface FilterOptions {
  id: string;
  displayName: string;
}

interface SELECT_FilterConfig {
  filterId: string;
  filterDisplayName: string;
  filterType: "SINGLE_SELECT" | "MULTI_SELECT";
  filterOptions: FilterOptions[];
}

interface RANGE_FilterConfig {
  filterId: string;
  filterDisplayName: string;
  filterType: "RANGE";
  minValue: number;
  maxValue: number;
}

type FilterConfig = SELECT_FilterConfig | RANGE_FilterConfig;

interface FilterSelection {
  [key: string]: string[];
}

const filtersConfigs: FilterConfig[] = [
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
        id: "Tripple Sharing",
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

const DesktopFilter = () => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);
  const [currentSelection, setCurrentSelection] = useState<FilterSelection>({});

  const handleFilterSelect = (
    filterId: string,
    filterOptionId: string,
    filterType: FilterConfig["filterType"]
  ) => {
    const updatedFilters = { ...currentSelection };
    if (!updatedFilters[filterId]) {
      updatedFilters[filterId] = [filterOptionId];
    } else {
      if (filterType === "MULTI_SELECT") {
        if (updatedFilters[filterId].includes(filterOptionId)) {
          updatedFilters[filterId] = updatedFilters[filterId].filter(
            (id) => id !== filterOptionId
          );
        } else {
          updatedFilters[filterId] = [
            ...updatedFilters[filterId],
            filterOptionId,
          ];
        }
      }
      if (filterType === "SINGLE_SELECT") {
        if (updatedFilters[filterId][0] === filterOptionId) {
          delete updatedFilters[filterId];
        } else {
          updatedFilters[filterId] = [filterOptionId];
        }
      }
    }
    setCurrentSelection(updatedFilters);
  };

  const handleRangeChange = (filterId: string, value: number[]) => {
    const updatedFilters = { ...currentSelection };
    updatedFilters[filterId] = value.map((v) => v.toString());
    setCurrentSelection(updatedFilters);
  };

  const handleFilterReset = () => {
    setCurrentSelection({});
    setCurrentFilterIndex(0);
  };

  const renderFilterOptions = (currentFilter: FilterConfig) => {
    const currentFilterOptionsSelected =
      currentSelection[currentFilter.filterId] ?? [];

    if (
      currentFilter.filterType === "MULTI_SELECT" ||
      currentFilter.filterType === "SINGLE_SELECT"
    ) {
      return currentFilter.filterOptions.map((filterOption) => (
        <Button
          key={filterOption.id}
          variant={"secondary-ghost"}
          onClick={() => {
            handleFilterSelect(
              currentFilter.filterId,
              filterOption.id,
              currentFilter.filterType
            );
          }}
          className={`${
            currentFilterOptionsSelected.includes(filterOption.id)
              ? " bg-secondary font-semibold"
              : ""
          }  justify-start`}
        >
          {filterOption.displayName}
        </Button>
      ));
    }
    if (currentFilter.filterType === "RANGE") {
      return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <Slider
            max={currentFilter.maxValue}
            min={currentFilter.minValue}
            defaultValue={
              currentSelection[currentFilter.filterId]?.map((v) =>
                parseInt(v)
              ) ?? [currentFilter.minValue]
            }
            onValueChange={(v) => {
              handleRangeChange(currentFilter.filterId, v);
            }}
          />
          <div className="w-full flex flex-row justify-between">
            <p className="text-muted-foreground">₹{currentFilter.minValue}</p>
            {currentSelection[currentFilter.filterId] && (
              <p className="font-semibold">
                ₹{currentSelection[currentFilter.filterId]}
              </p>
            )}
            <p className="text-muted-foreground">₹{currentFilter.maxValue}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-md">
      <div className="flex flex-row gap-2 ">
        <div className="flex flex-col p-2 outline rounded-2xl gap-2">
          {filtersConfigs.map((filter, index) => (
            <Button
              variant={"secondary-ghost"}
              key={filter.filterId}
              onClick={() => setCurrentFilterIndex(index)}
              className={`${
                index === currentFilterIndex ? "bg-secondary" : ""
              } justify-start`}
            >
              {`${filter.filterDisplayName} ${
                currentSelection[filter.filterId] &&
                currentSelection[filter.filterId].length !== 0
                  ? `(${currentSelection[filter.filterId].length})`
                  : ""
              }`}
            </Button>
          ))}
        </div>
        <div
          id="price"
          className="h-96 overflow-y-auto scroll-m-3 flex-1 flex flex-col p-2 outline rounded-2xl"
        >
          {renderFilterOptions(filtersConfigs[currentFilterIndex])}
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <Button variant={"secondary"} onClick={() => handleFilterReset()}>
          Reset
        </Button>
        <Button>Apply</Button>
      </div>
    </div>
  );
};

export default DesktopFilter;
