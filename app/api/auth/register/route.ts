import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!isValidEmail(email) || password.length < 8) {
    return NextResponse.json(
      {
        error: "Provide a valid email and a password of at least 8 characters.",
      },
      { status: 400 },
    );
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 },
      );
    const user = await prisma.user.create({
      data: { email, password_hash: await hashPassword(password) },
    });
    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json(
      {
        error: "Registration is unavailable until the database is configured.",
      },
      { status: 503 },
    );
  }
}
