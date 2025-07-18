export function verifyEmail(url: string, userName?: string) {
  return {
    subject: "🔐 Verify Your Email Address",
    html: `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="padding: 30px 40px;">
            <h1 style="margin: 0 0 16px; font-size: 24px; color: #333;">Welcome${userName ? `, ${userName}` : ""} 👋</h1>
            <p style="margin: 0 0 24px; font-size: 16px; color: #555;">
              Please verify your email address to activate your account.
            </p>
            <a href="${url}" target="_blank" style="
              display: inline-block;
              padding: 12px 24px;
              font-size: 16px;
              background-color: #0070f3;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
            ">
              ✅ Verify Email
            </a>
            <p style="margin: 32px 0 0; font-size: 14px; color: #888;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 16px 40px; text-align: center; font-size: 13px; color: #999;">
            © ${new Date().getFullYear()} Baasthana. All rights reserved.
          </div>
        </div>
      </div>
    `,
    text: `Welcome${userName ? `, ${userName}` : ""}!\n\nPlease verify your email by clicking the following link:\n${url}\n\nIf you didn’t create an account, you can ignore this email.`,
  };
}
