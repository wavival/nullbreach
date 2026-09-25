import { compare, hash } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { appPath } from "@/lib/paths";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: appPath("/login"), newUser: appPath("/register") },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });
        if (
          !user ||
          !(await verifyPassword(credentials.password, user.password_hash))
        )
          return null;
        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) session.user.id = token.userId;
      return session;
    },
  },
};

export const hashPassword = (password: string) => hash(password, 12);
export const verifyPassword = (password: string, passwordHash: string) =>
  compare(password, passwordHash);
export const getCurrentSession = () => getServerSession(authOptions);
