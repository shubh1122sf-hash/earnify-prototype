
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user type to include the `id` property.
   */
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type to include the user's ID (`sub`).
   */
  interface JWT {
    sub: string;
  }
}
