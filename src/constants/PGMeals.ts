import { PGMealsEnum } from "../../prisma/generated/prisma";

export const PGMealsEnumMap = {
  [PGMealsEnum.onlyDinner]: "Only Dinner",
  [PGMealsEnum.twoMeals]: "Lunch & Dinner",
  [PGMealsEnum.threeMeals]: "Breakfast, Lunch & Dinner",
};
