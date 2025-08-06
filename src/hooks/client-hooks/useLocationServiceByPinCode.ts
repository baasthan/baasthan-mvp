import { LocationInfo } from "@/types/location";
import useService from "../useService";

const useLocationServiceByPinCode = () => {
  const GET_LOCATION_BY_PINCODE = `/api/location`;
  const { data, error, execute, isLoading, isSuccess, resetService } =
    useService({
      callback: (pincode: string) => {
        return fetchLocationByPincode(pincode);
      },
    });
  const fetchLocationByPincode = async (
    pincode: string
  ): Promise<LocationInfo | null> => {
    const response = await fetch(
      `${GET_LOCATION_BY_PINCODE}?pincode=${pincode}`,
      {
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Unable to fetch location by pincode");
    }
    const jsonResponse = (await response.json()) as {
      data: LocationInfo[];
      success: true;
    };
    if (jsonResponse.data && jsonResponse.data.length > 0) {
      return jsonResponse.data[0];
    }
    return null;
  };

  return { data, error, isLoading, execute, isSuccess, resetService };
};

export default useLocationServiceByPinCode;
