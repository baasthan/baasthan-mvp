import { auth } from "@/lib/auth";
import { saveHouseRulesToDB } from "@/repository/houseRules";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// GET Handler - Fetch house rules for a given PG Registration ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  // Example: Fetch from DB (replace with real DB call)
  const houseRules = await fetchHouseRulesFromDB(id);

  if (!houseRules) {
    return NextResponse.json(
      { error: "House Rules not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ houseRules });
}

// POST Handler - Update/Add house rules for a given PG Registration ID
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!(session && session.user.id)) {
    return NextResponse.json({}, { status: 401 });
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
    return NextResponse.json({}, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  // console.log("ID===>", id);
  const { success } = z.string().uuid().safeParse(id);
  if (!success) {
    return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
  }
  if (!body.houseRules) {
    return NextResponse.json(
      { message: "Invalid House Rules" },
      { status: 400 }
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
  return NextResponse.json({}, { status: 500 });
}

// Example Mock Functions (replace with actual DB queries)
async function fetchHouseRulesFromDB(id: string) {
  // Simulate fetching from DB
  return `<p>House Rules for PG ${id}</p>`;
}
