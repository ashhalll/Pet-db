import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/db/index';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(db), // Connects NextAuth to your PostgreSQL database
    session: {
        strategy: 'jwt', // Use JWT-based session strategy
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Add custom claims to the token
            if (user) {
                token.id = user.id;
                token.role = user.role; // Add role to the token
            }
            return token;
        },
        async session({ session, token }) {
            // Attach role to the session
            session.user = {
                ...session.user,
                id: token.id,
                role: token.role,
            };
            return session;
        },
    },
    secret: JWT_SECRET,
    pages: {
        signIn: '/login', // Redirect to custom login page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };