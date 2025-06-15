import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy auth - replace with real user lookup logic
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "password123"
        ) {
          return { id: 1, name: "Admin User", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin-login',
    error: '/admin-login',
    verifyRequest: '/admin-login',
    newUser: '/dashboard', // Redirect after successful login
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
