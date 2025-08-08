import { SupportRequestType } from "@/types/support-request";

interface SupportEmailArgs {
  request: SupportRequestType;
}

export function supportEmailTemplate({ request }: SupportEmailArgs) {
  return {
    subject: "New Support Request",
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
                  New Support Request Details
                </h1>
                <table role="presentation" border="0" cellpadding="6" cellspacing="0" width="100%"
                  style="font-size: 15px; color: #444; border-collapse: collapse;">
                  <tr>
                    <td style="font-weight: 600; border-bottom: 1px solid #ddd; width: 150px;">ID:</td>
                    <td style="border-bottom: 1px solid #ddd;">${
                      request.id
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; border-bottom: 1px solid #ddd;">Email:</td>
                    <td style="border-bottom: 1px solid #ddd;">${
                      request.email
                    }</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 600; border-bottom: 1px solid #ddd;">Mobile Number:</td>
                    <td style="border-bottom: 1px solid #ddd;">${
                      request.mobileNumber
                    }</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #ddd;">
                    <td style="font-weight: 600;">Reason:</td>
                    <td>${request.reason}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #ddd;">
                    <td style="font-weight: 600;">Created At:</td>
                    <td>${request.createdAt}</td>
                  </tr>
                </table>
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
  };
}
