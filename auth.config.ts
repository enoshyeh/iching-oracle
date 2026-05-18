import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config — used by middleware only.
 * Do not import Prisma, bcrypt, or other Node-only modules here.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute =
        nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isDashboard && !isLoggedIn) {
        return false;
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
