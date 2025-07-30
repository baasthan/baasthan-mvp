import { NextResponse } from "next/server";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
  PrismaClient,
} from "../../../../../prisma/generated/prisma";
import { uploadImageToSupabase } from "@/utils/uploadImageToSupabase";

export async function POST(req: Request) {
  try {
    const db = new PrismaClient();
    const formData = await req.formData();

    const images = formData.getAll("images") as File[];

    // Parse helpers
    const getString = (key: string) => formData.get(key)?.toString() ?? "";
    const getBoolean = (key: string) => formData.get(key) === "true";
    const getNumber = (key: string) => Number(formData.get(key));
    const getArray = (key: string) =>
      formData.getAll(key).map((val) => val.toString());

    // Coerce all fields
    const propertyName = getString("propertyName");
    const hostId = getString("hostId") || "tQOS0pn890KLThn075ob4ZFPfX8zvvvW";
    const availableOccupancyType = getArray(
      "availableOccupancyType"
    ) as PGOccupancyTypeEnum[];
    const genderPolicy = formData.get(
      "genderPolicy"
    ) as PGGenderPolicyEnum;
    const startingPrice = parseFloat(formData.get("startingPrice") as string);
    const baasthanVerified = getBoolean("baasthanVerified");
    const reraRegistered = getBoolean("reraRegistered");
    const reraRegistrationNumber = formData.get("reraRegistrationNumber") as string || null;
    const amenities = getArray("amenities") as PGAmenitiesEnum[];
    const preferedTenants = getArray(
      "preferedTenants"
    ) as PGPreferedTenantsEnum[];
    const washroomType = getString("washroomType") as PGWashroomEnum;
    const floors = getNumber("floors");
    const operatingSince = getNumber("operatingSince");
    const meals = getString("meals") as PGMealsEnum;
    const noticePeriodInDays = getNumber("noticePeriodInDays");

    const addressLine1 = getString("addressLine1");
    const addressLine2 = getString("addressLine2");
    const locality = getString("locality");
    const city = getString("city");
    const district = getString("district");
    const state = getString("state");
    const country = getString("country");
    const pincode = getString("pincode");

    //  Upload Image to supabase
    const bucket = "paying-guest";
    const uploadedUrls = await uploadImageToSupabase(images, bucket, "upload");

    // DB transaction
    const createdProperty = await db.$transaction(async (tx) => {
      const property = await tx.payingGuestInfo.create({
        data: {
          propertyName,
          hostId,
          availableOccupancyType,
          genderPolicy,
          startingPrice,
          baasthanVerified,
          reraRegistered,
          reraRegistrationNumber,
          amenities,
          preferedTenants,
          washroomType,
          floors,
          operatingSince,
          meals,
          noticePeriodInDays,
          addressLine1,
          addressLine2,
          locality,
          city,
          district,
          state,
          country,
          pincode,
        },
      });

      await tx.payingGuestImages.createMany({
        data: uploadedUrls.map((url) => ({
          url,
          payingGuestId: property.id,
        })),
      });

      return property;
    });

    return NextResponse.json({ success: true, message: "Property is listed successfully" });
  } catch (error: any) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
