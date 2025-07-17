import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { APP_CONFIG, AUTH_CONFIG } from "@/config";

// If your Prisma file is located elsewhere, you can change the path

import { nextCookies } from "better-auth/next-js";
import { haveIBeenPwned } from "better-auth/plugins";
import { PrismaClient } from "../../prisma/generated/prisma";

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
  ],
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
