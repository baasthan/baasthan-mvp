export function hostingAcknowledgement() {
  return {
    subject: "We’ve Received Your Hosting Request",
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
                Dear User,
              </h1>
              <p style="margin: 0 0 16px; font-size: 15px; color: #444;">
                Thank you for sharing your details with us. We've received your hosting request and our team will get in touch with you shortly.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #444;">
                In the meantime, feel free to explore our community and discover how other hosts are making the most of their properties.
              </p>
              <p style="margin: 30px 0 0; font-size: 13px; color: #777;">
                We appreciate your interest in Baasthan and look forward to speaking with you soon.
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
    text: `Dear User,\n\nThank you for sharing your details with us. We've received your hosting request and our team will get in touch with you shortly.\n\nWe appreciate your interest in Baasthan.\n\n— Baasthana Team`,
  };
}
