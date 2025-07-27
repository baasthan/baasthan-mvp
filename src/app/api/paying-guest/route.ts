import { getPayingGuestInfoByFilters } from "@/repository/paying-guest";
import { NextRequest, NextResponse } from "next/server";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
  Prisma,
} from "../../../../prisma/generated/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

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

  console.log("amenities====>", amenities);
  const preferedTenants =
    (searchParams.getAll("preferedTenants") as PGPreferedTenantsEnum[]) ??
    undefined;
  const washroomType =
    (searchParams.get("washroomType") as PGWashroomEnum) ?? undefined;

  const meals = (searchParams.get("meals") as PGMealsEnum) ?? undefined;

  const pincode = searchParams.get("pincode") ?? undefined;

  const filters: Prisma.PayingGuestInfoWhereInput = {};

  if (availableOccupancyType && availableOccupancyType.length !== 0) {
    filters.availableOccupancyType = {
      hasSome: availableOccupancyType,
    };
  }

  if (genderPolicy) {
    filters.genderPolicy = {
      equals: genderPolicy,
    };
  }

  if (startingPrice && startingPrice !== 0) {
    filters.startingPrice = {
      lt: startingPrice,
    };
  }

  if (baasthanVerified) {
    filters.baasthanVerified = {
      equals: baasthanVerified === "true",
    };
  }

  if (reraRegistered) {
    filters.reraRegistered = {
      equals: reraRegistered === "true",
    };
  }

  if (amenities && amenities.length !== 0) {
    filters.amenities = {
      hasEvery: amenities,
    };
  }

  if (preferedTenants && preferedTenants.length !== 0) {
    filters.preferedTenants = {
      hasEvery: preferedTenants,
    };
  }

  if (washroomType) {
    filters.washroomType = {
      equals: washroomType,
    };
  }

  if (meals) {
    filters.meals = {
      equals: meals,
    };
  }

  if (pincode) {
    filters.pincode = {
      equals: pincode,
    };
  }

  const properties = await getPayingGuestInfoByFilters(filters);
  if (!properties) {
    return NextResponse.json(
      { message: "Unable to fetch Paying Guest", success: false },
      { status: 500 }
    );
  }
  if (properties.length === 0) {
    return NextResponse.json(
      { message: "No search results found", data: [], success: true },
      { status: 200 }
    );
  }

  return NextResponse.json({ data: properties, success: true });
}
