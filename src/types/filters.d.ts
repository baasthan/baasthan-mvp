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

interface BOOLEAN_FilterConfig {
  filterId: string;
  filterDisplayName: string;
  filterType: "BOOLEAN";
  defaultValue: boolean;
}

interface RANGE_FilterConfig {
  filterId: string;
  filterDisplayName: string;
  filterType: "RANGE";
  minValue: number;
  maxValue: number;
}

type FilterConfig =
  | SELECT_FilterConfig
  | RANGE_FilterConfig
  | BOOLEAN_FilterConfig;

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
