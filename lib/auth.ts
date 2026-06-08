import { NextAuthOptions } from "next-auth";
import { NextRequest } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) return null;
        if (credentials.email !== adminEmail) return null;
        const valid = await bcrypt.compare(credentials.password, adminHash);
        if (!valid) return null;
        return { id: "1", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Check if a request is authenticated — either via:
 * 1. NextAuth session (admin dashboard)
 * 2. Agent secret token (AI agent via Authorization header)
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  // Check agent secret token first (for AI agent calls)
  const agentSecret = process.env.AGENT_SECRET;
  if (agentSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader === `Bearer ${agentSecret}`) {
      return true;
    }
  }

  // Fall back to NextAuth session (for admin dashboard calls)
  const session = await getServerSession(authOptions);
  return !!session;
}
