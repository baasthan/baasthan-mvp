import { createPGSchema } from "@/constants/PgTypes";
import { auth } from "@/lib/auth";
import {
  savePayingGuest,
  savePayingGuestImages,
} from "@/repository/paying-guest";
import { CreatePayingGuestPayload } from "@/types/paying-guest";
import { uploadImageToSupabase } from "@/utils/uploadImageToSupabase";
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

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!(session && session.user)) {
    return NextResponse.json({}, { status: 401 });
  }

  const { error, success } = await auth.api.userHasPermission({
    headers: req.headers,
    body: {
      permissions: {
        property: ["insert"],
      },
    },
  });

  if (!success || error) {
    return NextResponse.json({}, { status: 403 });
  }

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
    const hostId = session.user.id;
    const availableOccupancyType = getArray(
      "availableOccupancyType"
    ) as PGOccupancyTypeEnum[];
    const securityDeposite = parseFloat(
      formData.get("securityDeposite") as string
    );
    const maintaince = parseFloat(formData.get("maintaince") as string);
    const genderPolicy = formData.get("genderPolicy") as PGGenderPolicyEnum;
    const startingPrice = parseFloat(formData.get("startingPrice") as string);
    const baasthanVerified = getBoolean("baasthanVerified");
    const reraRegistered = getBoolean("reraRegistered");
    const reraRegistrationNumber =
      (formData.get("reraRegistrationNumber") as string) || null;
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
    const singleSharingPrice = parseFloat(
      formData.get("singleSharingPrice") as string
    );
    const doubleSharingPrice = parseFloat(
      formData.get("doubleSharingPrice") as string
    );
    const trippleShareingPrice = parseFloat(
      formData.get("trippleShareingPrice") as string
    );

    //  Upload Image to supabase
    const bucket = "paying-guest";
    const uploadedUrls = await uploadImageToSupabase(images, bucket, "upload");

    // DB transaction

    const {
      success,
      data: validatedData,
      error: payloadError,
    } = createPGSchema.safeParse({
      propertyName,
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
      singleSharingPrice,
      doubleSharingPrice,
      trippleShareingPrice,
      maintaince,
      securityDeposite,
    });
    if (!success) {
      return NextResponse.json(
        { message: "Bad Payload", error: payloadError },
        { status: 400 }
      );
    }
    const data: CreatePayingGuestPayload = {
      ...validatedData,
      user: {
        connect: { id: hostId },
      },
    };
    const createdProperty = await db.$transaction(async (tx) => {
      const property = await savePayingGuest(data, tx);
      if (property) {
        await savePayingGuestImages(
          uploadedUrls.map((url) => ({ url, payingGuestId: property.id })),
          tx
        );

        return property;
      }
      return null;
    });
    if (createdProperty) {
      return NextResponse.json({
        success: true,
        message: "Property is listed successfully",
        data: {
          id: createdProperty.id,
        },
      });
    }
  } catch (error: unknown) {
    console.error("Transaction failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
