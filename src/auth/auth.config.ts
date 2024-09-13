import { fetchGitHub } from "@/actions/fetchGitHub";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
/*
📌 Make one central auth config that can be imported to auth.ts or middleware when required
*/
export const AUTH_BASE_PATH = "/api/auth";
export default {
  //In a Docker environment, make sure to set either trustHost: true in your Auth.js configuration or the AUTH_TRUST_HOST environment variable to true.
  trustHost: true,
  //debug: true,
  basePath: AUTH_BASE_PATH,
  secret: `${process.env.AUTH_SECRET}`,
  providers: [GitHub],
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      const user = await fetchGitHub("user", "GET");
      token.userId = user.id;
      return token;
    },
    async session({ token, session }) {
      // Ensure that only valid session properties are returned
      if (token.userId) {
        session.user.id = token.userId as string; // Adding the user ID to the session object
      }
      return session; // Return the modified session object
    },
  },
} satisfies NextAuthConfig;
