import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { APP_CONFIG, AUTH_CONFIG } from "@/config";

// If your Prisma file is located elsewhere, you can change the path

import { nextCookies } from "better-auth/next-js";
import { admin, haveIBeenPwned, organization } from "better-auth/plugins";
import { PrismaClient } from "../../prisma/generated/prisma";
import {
  appAC,
  contentAdminRole,
  contentCreatorRole,
  endUserRole,
  hostUserRole,
  superAdminRole,
} from "./access-controls/app-access-control";
import {
  orgAcc,
  ownerRole,
  tenantRole,
} from "./access-controls/org-access-control";

import { verifyEmail } from "./emailTemplates/verifyEmail";
import { sendEmail } from "./send-email";
const prisma = new PrismaClient();
export const auth = betterAuth({
  appName: APP_CONFIG.APP_NAME,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    nextCookies(),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "This password has been found in some data breaches. Please try any other password",
    }),
    admin({
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
    organization({
      ac: orgAcc,
      roles: {
        tenantRole,
        ownerRole,
      },

      organizationCreation: { disabled: false },
      organizationDeletion: { disabled: true },
      allowUserToCreateOrganization: async (user) => {
        // Need to implement check if the user has role
        console.log("User===>", user);
        return true;
      },
    }),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const { subject, html, text } = verifyEmail(url, user.name);
      await sendEmail({
        to: user.email,
        subject,
        html,
        text,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: AUTH_CONFIG.EMAIL_PASSWORD.enabled,
    autoSignIn: false,
    minPasswordLength: AUTH_CONFIG.EMAIL_PASSWORD.minLength,
    maxPasswordLength: AUTH_CONFIG.EMAIL_PASSWORD.maxLength,
    requireEmailVerification:
      AUTH_CONFIG.EMAIL_PASSWORD.requireEmailVerification,
  },
  socialProviders: {
    google: {
      enabled: AUTH_CONFIG.GOOGLE.enabled,
      clientId: AUTH_CONFIG.GOOGLE.clientId,
      clientSecret: AUTH_CONFIG.GOOGLE.clientSecret,
    },
  },
});
