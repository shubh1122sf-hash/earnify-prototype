
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // This function will only be executed if the user is authenticated.
    // You can add additional logic here if needed.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// This configures the middleware to protect specific routes.
export const config = {
  matcher: ["/", "/leaderboard", "/api/score"],
};
