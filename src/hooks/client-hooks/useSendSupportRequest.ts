import { SupportReasonEnum } from "../../../prisma/generated/prisma";
import useService from "../useService";

const useSendSupportRequest = () => {
  const SAVE_SUPPORT_API = `/api/support-request`;
  const saveSupport = async (
    email: string,
    mobileNumber: string,
    reason: SupportReasonEnum = "tenancy"
  ) => {
    const response = await fetch(SAVE_SUPPORT_API, {
      method: "POST",
      body: JSON.stringify({ email, mobileNumber, reason }),
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
      callback: ({ email, mobileNumber, reason }) =>
        saveSupport(email, mobileNumber, reason),
    });

  return { data, error, execute, isLoading, isSuccess, resetService };
};

export default useSendSupportRequest;
