import { NextRequest, NextResponse } from "next/server";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGOccupancyTypeEnum,
  PrismaClient,
} from "../../../../prisma/generated/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const genderPolicy =
    (searchParams.get("genderPolicy") as PGGenderPolicyEnum) ?? undefined;
  const baasthanVerified = true as boolean;
  const amenities =
    (searchParams.getAll("amenities") as PGAmenitiesEnum[]) ?? undefined;
  const availableOccupancyType = searchParams.getAll(
    "availableOccupancyType"
  ) as PGOccupancyTypeEnum[];

  const prisma = new PrismaClient();
  const payingGuestInfo = await prisma.payingGuestInfo.findMany({
    where: {
      genderPolicy: {
        equals: genderPolicy,
      },
      amenities: {
        hasEvery: amenities,
      },
    },
  });
  return NextResponse.json(payingGuestInfo);
}
