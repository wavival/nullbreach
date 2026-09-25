import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { appPath } from "@/lib/paths";

const TOKEN_TTL_MS = 60 * 60 * 1000;

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export async function createPasswordResetToken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  await prisma.passwordResetToken.deleteMany({ where: { user_id: user.id } });
  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      user_id: user.id,
      token_hash: hashToken(token),
      expires_at: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });
  return token;
}

export async function consumePasswordResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token_hash: hashToken(token) },
  });
  if (!resetToken || resetToken.used_at || resetToken.expires_at <= new Date())
    return null;
  return resetToken;
}

export const resetUrl = (token: string) => {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return new URL(
    `${appPath("/reset-password")}?token=${encodeURIComponent(token)}`,
    base,
  ).toString();
};

export async function sendPasswordResetEmail(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PASSWORD_RESET_FROM;
  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production")
      console.info(`Password reset URL for ${email}: ${url}`);
    return;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Reset your NullBreach password",
      text: `Use this link within one hour to reset your password: ${url}`,
    }),
  });
  if (!response.ok) throw new Error("Password reset email could not be sent.");
}
