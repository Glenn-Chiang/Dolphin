import prisma from "@/db/db";
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // When user attempts to sign in with email, find any match in db with this email
    // If a match is found, user is authorized, else user is unauthorized
    async signIn({ user }) {
      // Unauthorized if no email provided
      if (!user.email) return false;

      const matchedUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      return !!matchedUser
    },
    async jwt({ token, profile }) {
      // Attach userId to jwt on login
      if (profile) {
        const matchedUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (matchedUser) {
          token.id = matchedUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Retrieve userId from token and attach it to session object
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
