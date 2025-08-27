import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher([
  "/banned(.*)",
  "/forbidden-words",
  "/all-conversations(.*)",
  "/all-photos(.*)",
]);
const isBannedAllowedRoute = createRouteMatcher(["/", "/profile-details"]);

export default clerkMiddleware(async (auth, req) => {
  //  get user id
  const { userId } = await auth();

  // check if admin user & routes
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // check if member user is banned
  const banDate = req.cookies.get("banDate")?.value;
  
  if (banDate) {
    const banActive = new Date(banDate) >= new Date();

    if (banActive && !isBannedAllowedRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
