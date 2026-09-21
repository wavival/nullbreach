import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/chat/:path*", "/api/analyze/:path*", "/api/history/:path*"],
};
