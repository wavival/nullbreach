import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { askOpenAI, OPENAI_MODEL } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { isNonEmptyString } from "@/lib/validation";

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { question } = await request.json().catch(() => ({}));
  if (!isNonEmptyString(question))
    return NextResponse.json(
      { error: "question is required" },
      { status: 400 },
    );
  try {
    const response = await askOpenAI(question.trim());
    const entry = await prisma.chatHistory.create({
      data: {
        user_id: session.user.id,
        question: question.trim(),
        response,
        model: OPENAI_MODEL,
      },
    });
    return NextResponse.json({
      response,
      id: entry.id,
      timestamp: entry.created_at,
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json(
      { error: "Unable to process the chat request." },
      { status: 502 },
    );
  }
}
