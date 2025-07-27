"use client";
import { FilterConfig, FilterSelection } from "@/types/filters";
import { ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Slider } from "../ui/slider";
import { Location } from "./location-autocomplete";
interface DesktopFilterProps {
  filters: FilterConfig[];
}

const DesktopFilter = ({ filters }: DesktopFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div className="flex flex-row gap-4 ">
      <div className="flex-4/5">
        <Location />
      </div>
      <div className="flex-1/5">
        <DropdownMenu>
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
    </div>
  );
};

export default DesktopFilter;
