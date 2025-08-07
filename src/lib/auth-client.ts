import { APP_CONFIG } from "@/config";
import { adminClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import {
  appAC,
  contentAdminRole,
  contentCreatorRole,
  endUserRole,
  hostUserRole,
  superAdminRole,
} from "./access-controls/app-access-control";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: APP_CONFIG.BASE_URL,
  plugins: [
    nextCookies(),

    adminClient({
      ac: appAC,
      impersonationSessionDuration: 0,
      permitImpersonation: false,
      defaultRole: "endUserRole",
      roles: {
        superAdminRole,
        hostUserRole,
        contentAdminRole,
        contentCreatorRole,
        endUserRole,
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
