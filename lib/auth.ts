import { sendEmail } from "@/actions/send-email";
import prisma from "@/db";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, oAuthProxy, openAPI } from "better-auth/plugins";

const proxyBaseUrl: string =
  process.env.NODE_ENV !== "development"
    ? "https://thecleanprogram.org"
    : "http://localhost:3000";

export const auth = betterAuth({
  baseURL: proxyBaseUrl,

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
