import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to build Prisma filter from query params and allowed fields
function buildFilter(query: URLSearchParams, allowedFields: string[]) {
  const filter: Record<string, any> = {};
  for (const field of allowedFields) {
    if (query.has(field)) {
      let value = query.get(field);
      if (value !== null) {
        // Handle array fields (e.g., occupancyType)
        if (field === "occupancyType") {
          filter[field] = { hasSome: value.split(",") };
        } else {
          filter[field] = value;
        }
      }
    }
  }
  return filter;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "Missing 'type' parameter (pg, residential, commercial)" }, { status: 400 });
  }

  let allowedFields: string[] = [];
  let propertyIds: string[] = [];

  try {
    switch (type) {
      case "pg": {
        allowedFields = [
          "id", "locality", "budget", "occupancyType", "tenantsPreferred", "genderPrefered", "food_provided", "amenities", "postedBy", "propertyType", "floor", "reraRegistered", "reraRegistrationId"
        ];
        const filter = buildFilter(searchParams, allowedFields);
        const results = await prisma.pgInfo.findMany({ where: filter, select: { propertyId: true } });
        propertyIds = results.map((r: any) => r.propertyId);
        break;
      }
      case "residential": {
        allowedFields = [
          "id", "locality", "property_type", "budget", "configuration", "bathroom", "area", "furnishing", "postedBy", "available_from", "tenantsPreferred", "rera_registered"
        ];
        const filter = buildFilter(searchParams, allowedFields);
        const results = await prisma.residential_info.findMany({ where: filter, select: { propertyId: true } });
        propertyIds = results.map((r: any) => r.propertyId);
        break;
      }
      case "commercial": {
        allowedFields = [
          "id", "locality", "property", "budget", "configuration", "area", "furnishing", "postedBy", "availableFrom", "reraRegistered", "registered"
        ];
        const filter = buildFilter(searchParams, allowedFields);
        const results = await prisma.commercial_info.findMany({ where: filter, select: { propertyId: true } });
        propertyIds = results.map((r: any) => r.propertyId);
        break;
      }
      default:
        return NextResponse.json({ error: "Invalid 'type' parameter. Must be one of: pg, residential, commercial" }, { status: 400 });
    }

    if (propertyIds.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Query propertySearchResults for details
    const details = await prisma.propertySearchResults.findMany({
      where: { propertyId: { in: propertyIds } },
      select: {
        propertyId: true,
        propertyTitle: true,
        locality: true,
        montlyRent: true,
        bed: true,
        bath: true,
        balcony: true,
      },
    });

    return NextResponse.json({ results: details });
  } catch (error) {
    return NextResponse.json({ error: "Database error", details: String(error) }, { status: 500 });
  }
}
