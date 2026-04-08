import { NextRequest, NextResponse } from "next/server";

// Next.js middleware always runs on Edge Runtime by default — no declaration needed

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to page routes (not static assets)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public/")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Prevent browser and CDN from caching SSR pages
  // Pages always fetch fresh from Cloudflare KV on every request
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Surrogate-Control", "no-store");
  response.headers.set("CDN-Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
