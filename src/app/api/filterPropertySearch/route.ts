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
  PrismaClient,
} from "../../../../prisma/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    
    const type = searchParams.get("type");
    const availableOccupancyType = searchParams.get("occupancy_type");
    const genderPolicy = searchParams.get("gender");
    const preferedTenants = searchParams.get("tenants_prefered");
    const meals = searchParams.get("food_provided");
    const baasthanVerified = searchParams.get("verified_pg");
    const floor_min = searchParams.get("floor_min");
    const floor_max = searchParams.get("floor_max");
    const budget_min = searchParams.get("budget_min");
    const budget_max = searchParams.get("budget_max");

    
    if (type === "pg") {

      const filters: any = {
        ...(availableOccupancyType && {
          availableOccupancyType: { has: availableOccupancyType },
        }),
        ...(genderPolicy && { genderPolicy }),
        ...(preferedTenants && {
          preferedTenants: { has: preferedTenants },
        }),
        ...(meals && { meals }),
        ...(baasthanVerified && { baasthanVerified: baasthanVerified === "true" }),
        ...(floor_min || floor_max
          ? {
            floors: {
              ...(floor_min && { gte: Number(floor_min) }),
              ...(floor_max && { lte: Number(floor_max) }),
            },
          }
          : {}),
        ...(budget_min || budget_max
          ? {
            startingPrice: {
              ...(budget_min && { gte: Number(budget_min) }),
              ...(budget_max && { lte: Number(budget_max) }),
            },
          }
          : {}),
      };


      const properties = await prisma.payingGuestInfo.findMany({
        where: filters,
      });

      if (properties.length === 0) {
        return NextResponse.json({ message: "No search results found", data: [] }, { status: 200 });
      }

      return NextResponse.json(properties);
    }

    else if(type === "commercial"){
      return NextResponse.json({ error: "No properties yet" }, { status: 500 });
    }

    else if(type === "residential"){
      return NextResponse.json({ error: "No properties yet" }, { status: 500 });
    }

    else{
      return NextResponse.json({ error: "Invalid property type" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
