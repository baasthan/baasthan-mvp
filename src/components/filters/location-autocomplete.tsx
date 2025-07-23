"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface Coordinate {
  x: number;
  y: number;
}
interface LocationOption {
  id: string;
  coordinates?: Coordinate;
  locationTag: string[];
  locationDisplay: string;
  city?: string;
}

//This will be sorted by Location Display from Backend API
const mockLocations: LocationOption[] = [
  {
    id: "uuid1",
    locationTag: ["varthurRoad", "varthur"],
    locationDisplay: "Varthur Road",
    city: "Bangalore",
  },
  {
    id: "uuid2",
    locationTag: ["bNarayanPura", "b", "narayan", "narayanpura"],
    locationDisplay: "B Narayan Pura",
    city: "Bangalore",
  },
  {
    id: "uuid3",
    locationTag: ["mahadevpura"],
    locationDisplay: "Mahadevpura",
    city: "Bangalore",
  },
  {
    id: "uuid4",
    locationTag: ["electronicCityPhase1", "electronic", "city", "phase", "1"],
    locationDisplay: "Electronic City Phase 1",
    city: "Bangalore",
  },
  {
    id: "uuid5",
    locationTag: ["nagavara", "elements mall"],
    locationDisplay: "Nagavara",
    city: "Bangalore",
  },
  {
    id: "uuid6",
    locationTag: ["marathalli", "spice garden"],
    locationDisplay: "Marathali",
    city: "Bangalore",
  },
];

const Location = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = mockLocations.filter((location) =>
      location.locationDisplay.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query]);

  const handleSelect = (location: LocationOption) => {
    setQuery(location.locationDisplay);
    setShowSuggestions(false);
    const locationQueryParam = new URLSearchParams(window.location.search);
    locationQueryParam.set("location", location.id);
    const newUrl = `${
      window.location.pathname
    }?${locationQueryParam.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <div className="relative w-full">
      <Input
        icon={Search}
        iconPosition="right"
        placeholder="Select a location"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md max-h-48 overflow-y-auto">
          {suggestions.map((location) => (
            <li
              key={location.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(location)}
            >
              {location.locationDisplay}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Location };
