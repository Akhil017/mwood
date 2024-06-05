import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/auth";
// import { getSession, updateSession } from "./app/admin/_actions/auth";

export async function middleware(req: NextRequest) {
  const isAuthenticated = await getSession();
  const path = req.nextUrl.pathname;

  // if login or signup and have token then redirect to /admin
  const isPublicPath = path === "/admin/login";

  // if user already authenticated and trying to access the login page route him to admin dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // if the path is private and the user is not authenticated then route him to the login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return await updateSession(req);
}

// matchers to only check admin routes
export const config = {
  matcher: "/admin/:path*",
};
