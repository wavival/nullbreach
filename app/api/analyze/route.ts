import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { analyzeCode } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { hasValidLength, isNonEmptyString } from "@/lib/validation";

const MAX_CODE_LENGTH = 20_000;

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { code } = await request.json().catch(() => ({}));
  if (!isNonEmptyString(code))
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  if (!hasValidLength(code, MAX_CODE_LENGTH))
    return NextResponse.json(
      { error: `code must be ${MAX_CODE_LENGTH} characters or fewer` },
      { status: 413 },
    );
  try {
    const vulnerabilities = await analyzeCode(code.trim());
    const entry = await prisma.codeAnalysis.create({
      data: {
        user_id: session.user.id,
        code_snippet: code.trim(),
        vulnerabilities,
      },
    });
    return NextResponse.json({
      vulnerabilities,
      id: entry.id,
      timestamp: entry.created_at,
    });
  } catch (error) {
    console.error("Analysis request failed", error);
    return NextResponse.json(
      { error: "Unable to analyze the submitted code." },
      { status: 502 },
    );
  }
}
