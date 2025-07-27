import { payingGuestFilterSchema } from "@/validation-schemas/paying-guest-filter-schema";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
  Prisma,
} from "../../../prisma/generated/prisma";

export const getAppliedPayingGuestFiltersBySearchParams = (
  searchParams: ReadonlyURLSearchParams
) => {
  const appliedFilters: Prisma.PayingGuestInfoWhereInput = {};

  const availableOccupancyType =
    (searchParams.getAll("availableOccupancyType") as PGOccupancyTypeEnum[]) ??
    undefined;
  const genderPolicy =
    (searchParams.get("genderPolicy") as PGGenderPolicyEnum) ?? undefined;
  const startingPrice = searchParams.get("startingPrice")
    ? parseFloat(searchParams.get("startingPrice") || "")
    : undefined;
  const baasthanVerified = searchParams.get("baasthanVerified");
  const reraRegistered = searchParams.get("reraRegistered");
  const amenities =
    (searchParams.getAll("amenities") as PGAmenitiesEnum[]) ?? undefined;

  const preferedTenants =
    (searchParams.getAll("preferedTenants") as PGPreferedTenantsEnum[]) ??
    undefined;
  const washroomType =
    (searchParams.get("washroomType") as PGWashroomEnum) ?? undefined;

  const meals = (searchParams.get("meals") as PGMealsEnum) ?? undefined;

  const pincode = searchParams.get("pincode") ?? undefined;

  if (availableOccupancyType && availableOccupancyType.length !== 0) {
    appliedFilters.availableOccupancyType = {
      hasSome: availableOccupancyType,
    };
  }

  if (genderPolicy) {
    appliedFilters.genderPolicy = {
      equals: genderPolicy,
    };
  }

  if (startingPrice && startingPrice !== 0) {
    appliedFilters.startingPrice = {
      lt: startingPrice,
    };
  }

  if (baasthanVerified) {
    appliedFilters.baasthanVerified = {
      equals: baasthanVerified === "true",
    };
  }

  if (reraRegistered) {
    appliedFilters.reraRegistered = {
      equals: reraRegistered === "true",
    };
  }

  if (amenities && amenities.length !== 0) {
    appliedFilters.amenities = {
      hasEvery: amenities,
    };
  }

  if (preferedTenants && preferedTenants.length !== 0) {
    appliedFilters.preferedTenants = {
      hasEvery: preferedTenants,
    };
  }

  if (washroomType) {
    appliedFilters.washroomType = {
      equals: washroomType,
    };
  }

  if (meals) {
    appliedFilters.meals = {
      equals: meals,
    };
  }

  if (pincode) {
    appliedFilters.pincode = {
      equals: pincode,
    };
  }

  return appliedFilters;
};

export const getAppliedPayingGuestFiltersByParams = async (
  params: Promise<{ [key: string]: string | string[] | undefined }>
) => {
  const queryParams = await params;
  const appliedFilters: Prisma.PayingGuestInfoWhereInput = {};

  const { success, data, error } =
    payingGuestFilterSchema.safeParse(queryParams);

  if (success) {
    const {
      availableOccupancyType,
      genderPolicy,
      startingPrice,
      baasthanVerified,
      reraRegistered,
      amenities,
      preferedTenants,
      washroomType,
      meals,
      pincode,
    } = data;

    if (availableOccupancyType) {
      appliedFilters.availableOccupancyType = {
        hasSome: availableOccupancyType,
      };
    }

    if (genderPolicy) {
      appliedFilters.genderPolicy = {
        equals: genderPolicy,
      };
    }

    if (startingPrice) {
      appliedFilters.startingPrice = {
        lt: startingPrice,
      };
    }

    if (baasthanVerified) {
      appliedFilters.baasthanVerified = {
        equals: baasthanVerified,
      };
    }

    if (reraRegistered) {
      appliedFilters.reraRegistered = {
        equals: reraRegistered,
      };
    }

    if (amenities) {
      appliedFilters.amenities = {
        hasEvery: amenities,
      };
    }

    if (preferedTenants) {
      appliedFilters.preferedTenants = {
        hasEvery: preferedTenants,
      };
    }

    if (washroomType) {
      appliedFilters.washroomType = {
        equals: washroomType,
      };
    }

    if (meals) {
      appliedFilters.meals = {
        equals: meals,
      };
    }
    if (pincode) {
      appliedFilters.pincode = {
        equals: pincode,
      };
    }
  }

  return appliedFilters;
};
