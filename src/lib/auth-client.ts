import { APP_CONFIG } from "@/config";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: APP_CONFIG.BASE_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
