import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const invocationId = `${Math.floor(Math.random() * 1000000)}-${new Date().toUTCString()}`;
  console.log("Edge middleware invoked:", invocationId);

  const headers = new Headers([ ["X-middleware-time", invocationId]]);
  return NextResponse.rewrite(new URL('/test/cached', request.url), { headers });
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/test/cached-with-edge',
};