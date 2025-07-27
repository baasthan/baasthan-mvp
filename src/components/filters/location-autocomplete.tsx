"use client";
import useLocationService from "@/hooks/client-hooks/useLocationService";
import { Circle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const LocationAutoComplete = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { data: suggestions, execute, isLoading } = useLocationService();
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);


  
  return (
    <div className="relative w-full">
      <Input
        icon={isLoading ? Circle : Search}
        iconPosition="right"
        placeholder="Select a location"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setShowSuggestions(true);

          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }

          debounceTimer.current = setTimeout(() => {
            execute(value);
          }, 500); // 300ms debounce delay
        }}
      />

      {showSuggestions && suggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-md max-h-48 overflow-y-auto">
          {suggestions.map((location) => (
            <li
              key={location.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {}}
            >
              {location.locality}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LocationAutoComplete };
