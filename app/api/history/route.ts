import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getCurrentSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const history = await prisma.chatHistory.findMany({
      where: { user_id: session.user.id },
      take: 10,
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ history });
  } catch (error) {
    console.error("History request failed", error);
    return NextResponse.json(
      { error: "History is unavailable until the database is configured." },
      { status: 503 },
    );
  }
}
