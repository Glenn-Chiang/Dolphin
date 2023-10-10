import prisma from "@/db/db";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
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
      // Unauthorized if no email provided
      if (!user.email) return false
      
      const matchedUser = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })
      if (matchedUser) {
        console.log('User matched:', matchedUser)
        user.id = matchedUser.id.toString()
      }
      return !!matchedUser
    },
    async session({session, user}) {

      // session.user.id = user.id 
      return session
    }
  }
});

export {handler as GET, handler as POST}