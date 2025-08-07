import type { PGFormData } from "@/constants/PgTypes";
import useService from "../useService";

const usePGRegistarationService = () => {
  const REGISTER_PG_DETAILS_API = `/api/pg/register`;
  const registerPgDetails = async (formData: PGFormData) => {
    const payload = new FormData();
    for (const key in formData) {
      if (key !== "images") {
        const value = formData[key as keyof PGFormData];
        if (Array.isArray(value)) {
          value.forEach((element) => {
            payload.append(key, element);
          });
        } else {
          payload.append(key, String(value));
        }
      }
    }

    if (formData?.images && formData.images.length > 0) {
      for (const file of formData.images) {
        payload.append("images", file);
      }
    }
    const response = await fetch(REGISTER_PG_DETAILS_API, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      throw new Error("Unable to register pg");
    }

    const jsonResponse = (await response.json()) as {
      success: boolean;
      message: string;
      data: {
        id: string;
      };
    };
    return jsonResponse;
  };

  const res = useService({
    callback: (formData: PGFormData) => {
      return registerPgDetails(formData);
    },
  });
  return res;
};

export default usePGRegistarationService;
