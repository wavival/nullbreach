import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" }, { headers });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json({ status: "degraded" }, { status: 503, headers });
  }
}
