import { NextResponse, MiddlewareConfig } from "next/server";

export function middleware() {
  console.log("running middleware");

  const responseStub = NextResponse.next();

  responseStub.headers.set("x-middleware", "true");

  return responseStub;
}

export const config: MiddlewareConfig = {
  matcher: "/with-middleware/:path*",
};
