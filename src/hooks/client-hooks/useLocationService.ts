import { LocationInfo } from "@/types/location";
import useService from "../useService";

const useLocationService = () => {
  const GET_LOCATION_AUTOCOMPLETE = `/api/location`;
  const { execute, data, error, isLoading, isSuccess, resetService } =
    useService({
      callback: (locationHint?: string) =>
        fetchLocationSuggestions(locationHint),
    });

  const fetchLocationSuggestions = async (locationHint?: string) => {
    const response = await fetch(
      `${GET_LOCATION_AUTOCOMPLETE}?locationHint=${locationHint}`,
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Unable to fetch locations");
    }
    const jsonResponse = (await response.json()) as {
      data: LocationInfo[];
      success: true;
    };
    return jsonResponse.data;
  };

  return { execute, data, error, isLoading, isSuccess, resetService };
};

export default useLocationService;
