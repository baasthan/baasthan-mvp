import { PrismaClient } from "../../prisma/generated/prisma";
import { getPayingGuestInfoById } from "./paying-guest";

export async function saveHouseRulesToDB(id: string, houseRules: string) {
  // Simulate saving to DB

  try {
    if (id) {
      const payingGuest = await getPayingGuestInfoById(id);
      if (!payingGuest) {
        throw new Error("No PG Available");
      }
      const client = new PrismaClient();
      const newHouseRule = await client.payingGuestHouseRules.create({
        data: {
          payingGuestId: id,
          houseRuleHtml: houseRules,
        },
        select: {
          id: true,
        },
      });
      if (newHouseRule.id) {
        return { id: newHouseRule.id };
      }
      throw new Error("Unable to create House Rule");
    }
    throw new Error("Invalid Id");
  } catch (error) {
    console.error("Error occured while saving house rule");
    console.debug(error);
    return null;
  }
}

export const getHouseRulesById = async (id: string) => {
  try {
    const client = new PrismaClient();
    const houseRule = await client.payingGuestHouseRules.findUniqueOrThrow({
      where: {
        payingGuestId: id,
      },
    });

    return houseRule;
  } catch (error) {
    return null;
  }
};
