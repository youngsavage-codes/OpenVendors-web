import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN_COOKIE = "access_token"; // change this if your cookie name is different

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;

  // 1️⃣ Routes that require token
  const protectedRoutes = ["/portal", "/authentication/account-type", "/authentication/verifyEmail"];
  
  // 2️⃣ Routes that should be inaccessible if token exists
  const authRoutes = ["/authentication/signin", "/authentication/signup", "/authentication/forgotpassword"];

  // Check if route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/authentication/signin";
      return NextResponse.redirect(url);
    }
  }

  // Check if route is authentication route and token exists
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/portal"; // redirect to portal if logged in
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Specify which paths this middleware applies to
export const config = {
  matcher: [
    "/portal/:path*", 
    "/onboarding/:path*", 
    "/authentication/:path*"
  ],
};
