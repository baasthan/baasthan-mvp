"use client";
import useLocationService from "@/hooks/client-hooks/useLocationService";
import useLocationServiceByPinCode from "@/hooks/client-hooks/useLocationServiceByPinCode";
import { LocationInfo } from "@/types/location";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface LocationAutoCompleteProps {
  selectedLocation?: LocationInfo;
  onLocationSelect: (v: LocationInfo) => void;
  onLocationReset: () => void;
}

const LocationAutoComplete = ({
  selectedLocation,
  onLocationSelect,
  onLocationReset,
}: LocationAutoCompleteProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { data: suggestions, execute, isLoading } = useLocationService();

  const {
    data: searchParamsLocation,
    error,
    execute: getLocation,
  } = useLocationServiceByPinCode();
  // const [selectedLocation, setSelectedLocation] = useState<LocationInfo>();
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const pincode = searchParams.get("pincode");
    if (pincode) {
      console.log("fetching location");
      getLocation(pincode);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("searchParamsLocation==>", searchParamsLocation);
    if (searchParamsLocation) {
      onLocationSelect(searchParamsLocation);
    }
  }, [searchParamsLocation]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location: LocationInfo) => {
    // setSelectedLocation(location);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  const handleLocationReset = () => {
    // setSelectedLocation(undefined);
    onLocationReset();
    setShowSuggestions(true);
    setQuery("");
    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("pincode");
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <div className="relative w-full rounded-md flex flex-row items-center outline py-2 h-12">
        {selectedLocation && (
          <Button variant={"outline"} className="w-full justify-between">
            <div>{selectedLocation.locality}</div>
            <Button variant={"ghost"} size={"icon"}>
              <div onClick={() => handleLocationReset()}>
                <X />
              </div>
            </Button>
          </Button>
        )}
        {!selectedLocation && (
          <input
            placeholder="Select a location"
            value={query}
            className=" focus:outline-0 px-2 w-full"
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              setShowSuggestions(true);

              if (value !== "") {
                if (debounceTimer.current) {
                  clearTimeout(debounceTimer.current);
                }

                debounceTimer.current = setTimeout(() => {
                  execute(value);
                }, 500); // 300ms debounce delay
              }
              if (value === "") {
                setShowSuggestions(false);
              }
            }}
          />
        )}
      </div>
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md max-h-48 overflow-y-auto">
          {suggestions.map((location) => (
            <li
              key={location.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleLocationSelect(location);
              }}
            >
              <p className="font-semibold">{location.locality}</p>
              <p className=" capitalize font-light">
                {location.RelatedLocality.map(
                  (relatedLocality) => relatedLocality.name
                ).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LocationAutoComplete };
