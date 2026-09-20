import { withAuth } from "next-auth/middleware";

const protectApiRoutes = withAuth({
  callbacks: { authorized: ({ token }) => Boolean(token) },
});

export function proxy(...args: Parameters<typeof protectApiRoutes>) {
  return protectApiRoutes(...args);
}

export const config = {
  matcher: ["/api/chat/:path*", "/api/analyze/:path*", "/api/history/:path*"],
};
