import { compare, hash } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;
      const email = user.email.toLowerCase();
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, password_hash: "" },
      });
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const databaseUser = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase() },
          select: { id: true },
        });
        if (databaseUser) token.userId = databaseUser.id;
      }
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
