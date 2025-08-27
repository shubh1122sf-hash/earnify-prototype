
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If essential auth variables are missing, bypass all middleware logic.
  // This prevents the app from crashing in environments like the Studio Preview.
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    console.warn("Auth environment variables are missing. Bypassing middleware.");
    return NextResponse.next();
  }

  const isProd = process.env.NODE_ENV === "production";
  const cookieName = isProd
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  const sessionToken = request.cookies.get(cookieName);
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login";

  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  if (!sessionToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     * - public (public assets)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|assets|public).*)",
  ],
};
