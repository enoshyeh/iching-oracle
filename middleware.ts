import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
  const isDashboard = nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
