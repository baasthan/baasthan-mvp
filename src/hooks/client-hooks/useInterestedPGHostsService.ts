import { APP_CONFIG } from "@/config";
import useService from "../useService";

const useInterestedPGHostsService = () => {
  const SAVE_INTERESTED_PG_OWNER_API = `${APP_CONFIG.BASE_URL}/api/interested-pg-owner`;
  const saveInterestedPGOwner = async (email: string, mobileNumber: string) => {
    const response = await fetch(SAVE_INTERESTED_PG_OWNER_API, {
      method: "POST",
      body: JSON.stringify({ email, mobileNumber }),
    });

    if (!response.ok) {
      throw new Error("Unable to save interested pg owner");
    }
    const jsonResponse = (await response.json()) as {
      success: boolean;
      message: string;
    };
    return jsonResponse;
  };

  const { data, error, execute, isLoading, isSuccess, resetService } =
    useService({
      callback: ({ email, mobileNumber }) =>
        saveInterestedPGOwner(email, mobileNumber),
    });

  return { data, error, execute, isLoading, isSuccess, resetService };
};

export default useInterestedPGHostsService;
