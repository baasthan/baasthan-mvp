import { auth } from "@/lib/auth";
import { saveHouseRulesToDB } from "@/repository/houseRules";
import { getUnverifiedPayingGuestInfoById } from "@/repository/paying-guest";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// POST Handler - Update/Add house rules for a given PG Registration ID
export async function POST(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const segments = pathName.split("/");
  const id = segments[4];

  const { success: isValidUUID } = z.string().uuid().safeParse(id);

  if (!isValidUUID) {
    return NextResponse.json(
      { message: "Invalid Id", success: false },
      { status: 400 }
    );
  }

  const body = await request.json();

  if (!body.houseRules) {
    return NextResponse.json(
      { message: "Invalid House Rules", success: false },
      { status: 400 }
    );
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!(session && session.user.id)) {
    return NextResponse.json(
      { message: "Unauthenticated", success: false },
      { status: 401 }
    );
  }

  const { success: hasPermission, error } = await auth.api.userHasPermission({
    headers: request.headers,
    body: {
      permissions: {
        property: ["insert"],
      },
    },
  });

  if (!hasPermission || error) {
    return NextResponse.json(
      { message: "Access Denied", success: false },
      { status: 403 }
    );
  }

  const payingGuestInfo = await getUnverifiedPayingGuestInfoById(id);

  if (!payingGuestInfo) {
    return NextResponse.json(
      { message: "Not Found", success: false },
      { status: 404 }
    );
  }

  if (payingGuestInfo.user.id !== session.user.id) {
    return NextResponse.json(
      { message: "Access Denied", success: false },
      { status: 403 }
    );
  }

  // Example: Save to DB (replace with real DB operation)
  const result = await saveHouseRulesToDB(id, body.houseRules);

  if (result && result.id) {
    return NextResponse.json({
      success: true,
      data: { id: result.id.toString() },
    });
  }
  return NextResponse.json(
    { message: "Unable to save House Rules", success: false },
    { status: 500 }
  );
}

// Example Mock Functions (replace with actual DB queries)
async function fetchHouseRulesFromDB(id: string) {
  // Simulate fetching from DB
  return `<p>House Rules for PG ${id}</p>`;
}
