import { PGAmenitiesEnumMap } from "@/constants/PGAmenitiesType";
import { PGGenderPolicyEnumMap } from "@/constants/PGGenderPolicyType";
import { PGMealsEnumMap } from "@/constants/PGMeals";
import { PGOccupancyTypeEnumMap } from "@/constants/PGOccupancyType";
import { PGPreferedTenantsEnumMap } from "@/constants/PGPreferedTenantsType";
import { PGWashroomEnumMap } from "@/constants/PGWashroomType";
import { FilterConfig } from "@/types/filters";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import { Prisma, PrismaClient } from "../../prisma/generated/prisma";

export const getPayingGuestFilters = async () => {
  const publicFilters: FilterConfig[] = [];

  /** availableOccupancyType */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.availableOccupancyType,
    filterDisplayName: "Occupancy Type",
    filterType: "MULTI_SELECT",
    filterOptions: Object.entries(PGOccupancyTypeEnumMap).map(
      ([key, value]) => ({ id: key, displayName: value })
    ),
  });

  /** genderPolicy */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.genderPolicy,
    filterDisplayName: "Gender Policy",
    filterType: "SINGLE_SELECT",
    filterOptions: Object.entries(PGGenderPolicyEnumMap).map(
      ([key, value]) => ({ id: key, displayName: value })
    ),
  });

  /** startingPrice */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.startingPrice,
    filterDisplayName: "Budget",
    filterType: "RANGE",
    minValue: 0,
    maxValue: 100000,
  });

  // /** baasthanVerified */
  // publicFilters.push({
  //   filterId: Prisma.PayingGuestInfoScalarFieldEnum.baasthanVerified,
  //   filterDisplayName: "Baasthan Verified",
  //   filterType: "BOOLEAN",
  //   defaultValue: true,
  // });

  // /** reraRegistered */
  // publicFilters.push({
  //   filterId: Prisma.PayingGuestInfoScalarFieldEnum.reraRegistered,
  //   filterDisplayName: "RERA Registered",
  //   filterType: "BOOLEAN",
  //   defaultValue: true,
  // });

  /** Amenities */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.amenities,
    filterDisplayName: "Amenities",
    filterType: "MULTI_SELECT",
    filterOptions: Object.entries(PGAmenitiesEnumMap).map(([key, value]) => ({
      id: key,
      displayName: value,
    })),
  });

  /** preferedTenants */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.preferedTenants,
    filterDisplayName: "Prefered Tenants",
    filterType: "MULTI_SELECT",
    filterOptions: Object.entries(PGPreferedTenantsEnumMap).map(
      ([key, value]) => ({ id: key, displayName: value })
    ),
  });

  /** washroomType */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.washroomType,
    filterDisplayName: "Washroom Type",
    filterType: "SINGLE_SELECT",
    filterOptions: Object.entries(PGWashroomEnumMap).map(([key, value]) => ({
      id: key,
      displayName: value,
    })),
  });

  /** meals */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.meals,
    filterDisplayName: "Meals",
    filterType: "SINGLE_SELECT",
    filterOptions: Object.entries(PGMealsEnumMap).map(([key, value]) => ({
      id: key,
      displayName: value,
    })),
  });

  return publicFilters;
};

export const getPayingGuestInfoByFilters = async (
  filter: Prisma.PayingGuestInfoWhereInput
): Promise<PayingGuestInfoWithPublicUser[] | null> => {
  try {
    const prisma = new PrismaClient({
      log: ["error"],
    });
    const properties = await prisma.payingGuestInfo.findMany({
      where: filter,
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        PayingGuestImages: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return properties;
  } catch (error) {
    console.error("Unable to fetch properties");
    console.debug(error);
    return null;
  }
};
