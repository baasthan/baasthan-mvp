import useService from "../useService";

const useSaveHouseRules = () => {
  const SAVE_HOUSE_RULES_API = "/api/pg/register/";
  const saveHouseRules = async (id: string, html: string) => {
    const response = await fetch(`${SAVE_HOUSE_RULES_API}${id}/house-rules`, {
      method: "POST",
      body: JSON.stringify({ houseRules: html }),
    });
    if (!response.ok) {
      throw new Error("Unable to save House Rules");
    }
    const jsonResponse = (await response.json()) as {
      data: { id: string };
      success: true;
    };
    return jsonResponse.data;
  };

  const { data, error, execute, isLoading, isSuccess, resetService } =
    useService({
      callback: (id, html) => saveHouseRules(id, html),
    });

  return { data, error, execute, isLoading, isSuccess, resetService };
};

export default useSaveHouseRules;
