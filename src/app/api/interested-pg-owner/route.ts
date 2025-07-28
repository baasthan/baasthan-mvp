// app/api/pg-owner/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../prisma/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const { email, mobileNumber } = await req.json();

    if (
      !email ||
      typeof email !== "string" ||
      !mobileNumber ||
      typeof mobileNumber !== "string" ||
      mobileNumber.length !== 10
    ) {
      return NextResponse.json(
        { success: false, message: "Bad Requests" },
        { status: 400 }
      );
    }

    const existingOwner = await prisma.pGHostInterested.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          { mobileNumber: { equals: mobileNumber } },
        ],
      },
    });

    if (existingOwner) {
      return NextResponse.json(
        {
          success: false,
          message: "We already have your contact. We'll reach out to you soon.",
        },
        { status: 200 }
      );
    }

    await prisma.pGHostInterested.create({
      data: { email, mobileNumber },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PG Owner API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
