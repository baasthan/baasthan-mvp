// app/api/pg-owner/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../prisma/generated/prisma";

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const existingOwner = await prisma.pgOwner.findUnique({
      where: { email },
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

    await prisma.pgOwner.create({
      data: { email },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll contact you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PG Owner API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
