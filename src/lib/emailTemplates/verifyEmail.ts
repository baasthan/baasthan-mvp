export function verifyEmail(url: string, userName?: string) {
  return {
    subject: "Confirm Your Email Address",
    html: `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="padding: 32px 40px;">
            <h1 style="margin: 0 0 20px; font-size: 22px; color: #333; font-weight: 600;">
              ${userName ? `Hi ${userName},` : "Welcome,"}
            </h1>
            <p style="margin: 0 0 24px; font-size: 15px; color: #444;">
              Thanks for signing up. Please confirm your email address to get started.
            </p>
            <button type="submit" style="
              padding: 12px 24px;
              font-size: 15px;
              font-weight: 500;
              background: #4c4ddc;
              color: white;
              border: none;
              border-radius: 26px;
              cursor: pointer;
            ">
              <a href=${url} style="color: white; text-decoration: none;">Verify Email</a>
            </button>
            <p style="margin: 30px 0 0; font-size: 13px; color: #777;">
              Didn’t request this? You can safely ignore this message.
            </p>
          </div>
          <div style="background: #f0f0f0; padding: 14px 40px; text-align: center; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} Baasthana. All rights reserved.
          </div>
        </div>
      </div>
    `,
    text: `${
      userName ? `Hi ${userName},` : "Welcome,"
    }\n\nPlease confirm your email to activate your account:\n${url}\n\nIf you didn’t request this, feel free to ignore this message.`,
  };
}
