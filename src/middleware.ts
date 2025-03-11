import { NextRequest, NextResponse, MiddlewareConfig } from "next/server";

export function middleware(request: NextRequest) {
  console.log("running middleware");

  const responseStub = NextResponse.next();

  responseStub.headers.set("x-middleware", "true");

  return responseStub;
}

export const config: MiddlewareConfig = {
  matcher: "/with-middleware/:path*",
};
