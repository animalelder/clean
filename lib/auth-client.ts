import {
  adminClient,
  emailOTPClient,
  oneTapClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { toast } from "sonner";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    emailOTPClient(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      cancelOnTapOutside: false,
      autoSelect: false,
      promptOptions: {
        baseDelay: 2000,
        maxAttempts: 5,
      },
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export type Session = typeof authClient.$Infer.Session;

export const { signIn, signOut, signUp, useSession } = authClient;
