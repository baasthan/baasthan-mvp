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

export {
  FilterConfig,
  FilterOptions,
  FilterSelection,
  RANGE_FilterConfig,
  SELECT_FilterConfig,
};
