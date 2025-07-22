"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const amenitiesList = ["WiFi", "AC", "Parking", "Food", "Gym", "Laundry", "Security", "Study Room"];
const typeList = ["All", "Single Room", "Shared Room"];

const FeaturedPropertiesFilter: React.FC = () => {
  const [type, setType] = useState("All");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const router = useRouter();

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (type !== "All") params.set("type", type);
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    if (maxBudget) params.set("maxBudget", maxBudget);
    if (verifiedOnly) params.set("verified", "true");
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setType("All");
    setSelectedAmenities([]);
    setMaxBudget("");
    setVerifiedOnly(false);
    router.push("?");
  };

  return (
    <div className="mb-6 bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-[220px_1fr_220px_220px] items-center gap-x-8 overflow-x-auto">
        {/* Type */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Type</span>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {typeList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {/* Amenities */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">Amenities</span>
          {amenitiesList.map((a) => (
            <label key={a} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a)}
                onChange={() => handleAmenityChange(a)}
                className="accent-indigo-500"
              />
              <span>{a}</span>
            </label>
          ))}
          <label className="flex items-center gap-1 font-medium">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={() => setVerifiedOnly(!verifiedOnly)}
              className="accent-indigo-500"
            />
            Verified Only
          </label>
        </div>
        {/* Max Budget */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Max Budget</span>
          <input
            type="number"
            placeholder="e.g. 15000"
            value={maxBudget}
            onChange={e => setMaxBudget(e.target.value)}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button onClick={handleApply}>Apply</Button>
          <Button variant="outline" onClick={handleReset}>Reset Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesFilter;