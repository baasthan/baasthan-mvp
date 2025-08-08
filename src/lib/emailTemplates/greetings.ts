interface GreetingsArgs {
  name: string;
}

export function greetings({ name }: GreetingsArgs) {
  return {
    subject: "Welcome to Baasthan Comunnity",
    html: `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
      style="background-color: #f4f4f7; padding: 40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600"
            style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.07); overflow: hidden;">
            <tr>
              <td style="padding: 32px 40px;">
                <h1 style="margin: 0 0 20px; font-size: 22px; color: #333; font-weight: 600;">
                  Hi ${name},
                </h1>
                <p style="margin: 0 0 16px; font-size: 15px; color: #444;">
                  Welcome to the Baasthan Community! 🎉
                  Your account is now ready, and we're excited to have you here.
                </p>
                <h2 style="margin: 0 0 16px; font-size: 18px; color: #4c4ddc; font-weight: 600;">
                  Explore properties and benefits for tenants:
                </h2>
                <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 15px; color: #444;">
                  <li>Browse verified property listings</li>
                  <li>Find accommodations that match your preferences</li>
                  <li>Enjoy secure and seamless communication with hosts</li>
                </ul>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                  <tr>
                    <td bgcolor="#4c4ddc" style="border-radius: 26px;">
                      <a href="https://mvp.baasthan.com/paying-guest" target="_blank" style="
                      display: inline-block;
                      padding: 12px 24px;
                      font-size: 15px;
                      font-weight: 500;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 26px;
                      background-color: #4c4ddc;">
                        Explore Properties
                      </a>
                    </td>
                  </tr>
                </table>
                <h2 style="margin: 0 0 16px; font-size: 18px; color: #4c4ddc; font-weight: 600;">
                  Interested in hosting your property?
                </h2>
                <p style="margin: 0 0 24px; font-size: 15px; color: #444;">
                  We'd love to help you get started. Whether it's a paying guest room, an apartment, or a shared space —
                  Baasthan makes it easy to connect with people looking for a place to stay.
                </p>
                <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 15px; color: #444;">
                  <li>List your property with our guidance</li>
                  <li>Reach verified and trusted tenants</li>
                  <li>Enjoy hassle-free management</li>
                </ul>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td bgcolor="#4c4ddc" style="border-radius: 26px;">
                      <a href="https://mvp.baasthan.com/contact-us" target="_blank" style="
                      display: inline-block;
                      padding: 12px 24px;
                      font-size: 15px;
                      font-weight: 500;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 26px;
                      background-color: #4c4ddc;">
                        Contact Us to Start Hosting
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin: 30px 0 0; font-size: 13px; color: #777;">
                  Not ready yet? That's okay — you can explore our listings and get inspired anytime.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background: #f0f0f0; padding: 14px 40px; text-align: center; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Baasthana. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>

</html>`,
    text: `Hi ${name},\n\nWelcome to the Baasthan Community.`,
  };
}
