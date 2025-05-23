import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient()],
});

export type Session = typeof authClient.$Infer.Session;

export const { signIn, signOut, signUp, useSession } = authClient;
