const AUTH_CONFIG = {
  SIGN_IN_URL: `${process.env.BASE_URL}?sign-in-prompt=true`,
  EMAIL_PASSWORD: {
    enabled: process.env.EMAIL_PASSWORD_ENABLED === "true" || false,
    minLength: 8,
    maxLength: 15,
    requireEmailVerification:
      process.env.EMAIL_PASSWORD_VERIFICATION === "true" || false,
  },
  GOOGLE: {
    enabled: process.env.GOOGLE_ENABLED === "true" || false,
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
} as const;

export default AUTH_CONFIG;
