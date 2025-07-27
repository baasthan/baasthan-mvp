"use client";
import { FilterConfig, FilterSelection } from "@/types/filters";
import { ListFilter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Location } from "./location-autocomplete";
interface DesktopFilterProps {
  filters: FilterConfig[];
}

const DesktopFilter = ({ filters }: DesktopFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);
  const [currentSelection, setCurrentSelection] = useState<FilterSelection>({});

  useEffect(() => {
    const appliedFilters = searchParams
      .entries()
      .reduce((updatedFilter, [key, value]) => {
        updatedFilter[key] = [...(updatedFilter[key] ?? []), value];
        return updatedFilter;
      }, {} as FilterSelection);
    setCurrentSelection(appliedFilters);
  }, [searchParams]);

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
      if (filterType === "BOOLEAN") {
        if (filterOptionId !== "true") {
          delete updatedFilters[filterId];
        } else {
          updatedFilters[filterId] = ["true"];
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

  const handleApplyFilter = () => {
    const queryParams = new URLSearchParams();

    Object.entries(currentSelection).forEach(([key, values]) => {
      values.forEach((value) => {
        queryParams.append(key, value);
      });
    });

    router.push(`?${queryParams.toString()}`);
    setDropdownOpen(false);
    setDrawerOpen(false);
  };

  const handleBaasthanVerified = () => {
    const queryParams = new URLSearchParams(searchParams);
    console.log(queryParams.toString());
    if (queryParams.get("baasthanVerified")) {
      queryParams.delete("baasthanVerified");
    } else {
      queryParams.set("baasthanVerified", "true");
    }
    router.push(`?${queryParams.toString()}`);
  };

  const renderFilterOptions = (currentFilter: FilterConfig) => {
    const currentFilterOptionsSelected =
      currentSelection[currentFilter.filterId] ?? [];

    if (currentFilter.filterType === "SINGLE_SELECT") {
      return (
        <RadioGroup>
          {currentFilter.filterOptions.map((filterOption) => (
            <Label key={filterOption.id}>
              <RadioGroupItem
                key={filterOption.id}
                onClick={() => {
                  handleFilterSelect(
                    currentFilter.filterId,
                    filterOption.id,
                    currentFilter.filterType
                  );
                }}
                value={filterOption.id}
                checked={currentFilterOptionsSelected.includes(filterOption.id)}
              />
              {filterOption.displayName}
            </Label>
          ))}
        </RadioGroup>
      );
    }

    if (currentFilter.filterType === "MULTI_SELECT") {
      return (
        <div className=" flex flex-col gap-3">
          {currentFilter.filterOptions.map((filterOption) => (
            <Label key={filterOption.id}>
              <Checkbox
                value={filterOption.id}
                onClick={() => {
                  handleFilterSelect(
                    currentFilter.filterId,
                    filterOption.id,
                    currentFilter.filterType
                  );
                }}
                checked={currentFilterOptionsSelected.includes(filterOption.id)}
              />
              {filterOption.displayName}
            </Label>
          ))}
        </div>
      );
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
    <div className="flex flex-col md:flex-row gap-4 ">
      <div className="flex-1/2 md:flex-4/5">
        <Location />
      </div>
      <Button
        variant={"outline"}
        className={`${
          searchParams.get("baasthanVerified") === "true" ? "bg-primary/15" : ""
        } w-fit`}
        onClick={() => {
          handleBaasthanVerified();
        }}
      >
        Baasthan Verified
        {searchParams.get("baasthanVerified") === "true" && <X />}
      </Button>
      <div className="flex-1/5 hidden md:flex">
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              <ListFilter />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col gap-2 w-lg">
              <div className="flex flex-row gap-2 ">
                <div className="h-96 overflow-y-auto flex flex-col p-2 outline rounded-2xl gap-2">
                  {filters.map((filter, index) => (
                    <div
                      key={filter.filterId}
                      onClick={() => setCurrentFilterIndex(index)}
                      className={`${
                        index === currentFilterIndex
                          ? "bg-secondary font-semibold"
                          : ""
                      } justify-start rounded-2xl px-2 py-0.5 cursor-default`}
                    >
                      {filter.filterDisplayName}
                    </div>
                  ))}
                </div>
                <div className="h-96 overflow-y-auto scroll-m-3 flex-1 flex flex-col p-2 outline rounded-2xl gap-2">
                  {renderFilterOptions(filters[currentFilterIndex])}
                </div>
              </div>
              <div className="flex flex-row gap-2 justify-end">
                <Button
                  variant={"secondary"}
                  onClick={() => handleFilterReset()}
                >
                  Reset
                </Button>
                <Button onClick={handleApplyFilter}>Apply</Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1/2 md:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="w-full">
              <ListFilter />
              Filter
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-row p-2">
              <div className="flex flex-col gap-2 py-2  pr-1">
                {filters.map((filter, index) => (
                  <p
                    key={index}
                    className={`${
                      index === currentFilterIndex
                        ? "bg-secondary font-semibold"
                        : ""
                    } justify-start rounded-2xl px-2 py-0.5 cursor-default `}
                    onClick={() => {
                      setCurrentFilterIndex(index);
                    }}
                  >
                    {filter.filterDisplayName}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-2 px-4 py-4 bg-accent text-accent-foreground rounded-2xl flex-1/2">
                {renderFilterOptions(filters[currentFilterIndex])}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 p-2">
              <Button
                variant={"secondary"}
                className="flex-1/2"
                onClick={handleFilterReset}
              >
                Reset
              </Button>
              <Button className="flex-1/2" onClick={handleApplyFilter}>
                Apply
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default DesktopFilter;
