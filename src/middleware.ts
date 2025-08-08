import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./config";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    const currentUrl = request.nextUrl.href;
    const searchParams = new URLSearchParams();
    searchParams.set("redirect", currentUrl);
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    const origin = request.nextUrl.origin;
    const redirectUrl = new URL(`${origin}/?${searchParams.toString()}`);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/register-pg", "/support"], // Specify the routes the middleware applies to
};
