import prisma from "@/db/db";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // When user attempts to sign in with email, find any match in db with this email
    // If a match is found, user is authorized, else user is unauthorized
    async signIn({user}) {
      const authorized = true
      console.log('Hello from login route. Email is:', user.email)
      // await prisma.user.findUnique)
      return authorized
    },
  }
});

export {handler as GET, handler as POST}