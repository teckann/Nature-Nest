// middleware in Next.js
/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}

export const config = {
  matcher: ["/account"],
};*/

// middleware in NextAuth
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  // should put the page that we want to protect
  matcher: ["/account"],
};
