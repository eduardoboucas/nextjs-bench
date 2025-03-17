import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  console.log("Edge middleware invoked");
  return NextResponse.rewrite(new URL('/test/cached', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/test/cached-with-edge',
};