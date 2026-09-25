import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { consumePasswordResetToken } from "@/lib/password-reset";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!token || password.length < 8 || password.length > 128)
    return NextResponse.json(
      { error: "Invalid token or password." },
      { status: 400 },
    );
  const resetToken = await consumePasswordResetToken(token);
  if (!resetToken)
    return NextResponse.json(
      { error: "This reset link is invalid or expired." },
      { status: 400 },
    );
  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.user_id },
      data: { password_hash: await hashPassword(password) },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used_at: new Date() },
    }),
  ]);
  return NextResponse.json({ message: "Password updated." });
}
