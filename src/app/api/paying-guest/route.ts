// REQUEST FORMAT
// GET Request

// https://<your-url>/api/properties?type=-------&occupancy_type=-------&gender=-------&tenants_prefered=-------&food_provided=-------&verified_pg=-------&floor_min=-------&floor_max=-------&budget_min=-------&budget_max=-------

// PLEASE NOTE:
// - "type" can be only: "pg", "commercial", "residential".
// - And for the rest of the parameters please refer "./prisma/schema.prisma" file.
// - In budget and floor parameters, min should not be greater than max and vice versa.
// - sample query:

// https://<your-url>/api/properties?type=pg&occupancy_type=singleSharing&gender=male&tenants_prefered=students&food_provided=threeMeals&verified_pg=true&floor_min=2&floor_max=3&budget_min=6000&budget_max=8000

import { NextRequest, NextResponse } from "next/server";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
  Prisma,
  PrismaClient,
} from "../../../../prisma/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const availableOccupancyType =
      (searchParams.getAll(
        "availableOccupancyType"
      ) as PGOccupancyTypeEnum[]) ?? undefined;
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

    const properties = await prisma.payingGuestInfo.findMany({
      where: filters,
    });

    if (properties.length === 0) {
      return NextResponse.json(
        { message: "No search results found", data: [] },
        { status: 204 }
      );
    }

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
