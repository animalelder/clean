import { sendEmail } from "@/actions/send-email";
import prisma from "@/db";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, oAuthProxy, openAPI } from "better-auth/plugins";

// Get the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_BASE_URL || "https://thecleanprogram.org";
  }
  return "http://localhost:3000";
};

// Get the base URL once
const baseUrl = getBaseUrl();

export const auth = betterAuth({
  trustedOrigins: [
    "https://thecleanprogram.org",
    "https://localhost:3000",
    "http://localhost:3000",
    "*.vercel.app",
  ],
  baseURL: baseUrl,
  database: prismaAdapter(prisma!, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email:${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.NEW_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEW_GOOGLE_CLIENT_SECRET!,
      redirectURI: `${baseUrl}/api/auth/callback/google`,
    },
  },
  plugins: [
    admin({ adminUserIds: ["tlXib8JDBebVnPr50kn63MrfQY3FTNkr"] }),
    openAPI(),
    oAuthProxy(),
    nextCookies(),
  ],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
