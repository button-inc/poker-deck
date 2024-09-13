import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export const config = {
  matcher: ["/((?!static|.*\\..*|api|_next|sw.js|favicon.ico|/).*)"], // Exclude certain paths and the root path "/"
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth(); // Authenticate user

  if (session) {
    // If the user is authenticated:
    if (pathname === "/") {
      // If user is on the root route ("/"), redirect them to the dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Otherwise, allow them to proceed to the requested route
    return NextResponse.next();
  }

  // If the user is not authenticated:
  if (pathname !== "/") {
    // For any non-root path, redirect to the home page ("/")
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to the root route ("/") without redirecting
  return NextResponse.next();
}
