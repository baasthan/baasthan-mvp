import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../prisma/generated/prisma";

export async function GET() {
  const prisma = new PrismaClient();
  const propertiesInfo = await prisma.propertyInfo.findMany();
  return NextResponse.json(propertiesInfo);
}
