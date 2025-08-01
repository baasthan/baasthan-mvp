import { getLocations } from "@/repository/location";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const locationHint = searchParams.get("locationHint") ?? "";

  const locations = await getLocations(locationHint);

  if (locations) {
    return NextResponse.json(
      { data: locations, success: true },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
        },
      }
    );
  } else {
    return NextResponse.json(
      { message: "Unable to fetch locations", success: false },
      { status: 500 }
    );
  }
}
