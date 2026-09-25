import { NextResponse } from "next/server";
import {
  createPasswordResetToken,
  resetUrl,
  sendPasswordResetEmail,
} from "@/lib/password-reset";
import { normalizeEmail, isValidEmail } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  if (!isValidEmail(email))
    return NextResponse.json(
      { error: "Provide a valid email." },
      { status: 400 },
    );
  try {
    const token = await createPasswordResetToken(email);
    if (token) await sendPasswordResetEmail(email, resetUrl(token));
  } catch (error) {
    console.error("Password reset request failed", error);
  }
  return NextResponse.json({
    message: "If an account exists, a reset link has been sent.",
  });
}
