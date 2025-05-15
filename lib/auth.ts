import { sendEmail } from "@/actions/send-email";
import prisma from "@/db";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, oAuthProxy, openAPI } from "better-auth/plugins";

// Get the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    console.log(
      "VERCEL_PROJECT_PRODUCTION_URL",
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    );
    console.log("BETTER_AUTH_URL", process.env.BETTER_AUTH_URL);
    console.log("VERCEL_URL", process.env.VERCEL_URL);
    return (
      "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.BETTER_AUTH_URL
    );
  }
  return "http://localhost:3000";
};

// Get the base URL once
const baseUrl = getBaseUrl();
console.log("Base URL:", baseUrl);

export const auth = betterAuth({
  baseURL: baseUrl,
  trustedOrigins: [
    "https://thecleanprogram.org",
    "https://localhost:3000",
    "http://localhost:3000",
    "https://30mmm-frontend-fork-git-better-auth-thirty-mighty-men.vercel.app",
    "https://30mmm-frontend-fork-xi.vercel.app",
  ],
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
