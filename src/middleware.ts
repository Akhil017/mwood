import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/auth";
// import { getSession, updateSession } from "./app/admin/_actions/auth";

export async function middleware(req: NextRequest) {
  const isAuthenticated = await getSession();
  const path = req.nextUrl.pathname;
  console.log({ path });

  // if login or signup and have token then redirect to /admin
  const isPublicPath = path === "/admin/login";
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return await updateSession(req);
}

// matchers to only check admin routes
export const config = {
  matcher: "/admin/:path*",
};
