import { hostingAcknowledgement } from "@/lib/emailTemplates/host-interested";
import { supportEmailTemplate } from "@/lib/emailTemplates/new-support-email";
import { tenantAcknowledgement } from "@/lib/emailTemplates/tenant-interested";
import { sendEmail } from "@/lib/send-email";
import {
  createSupportRequest,
  supportRequestExists,
} from "@/repository/support";
import { getSupportUsers } from "@/repository/users";
import { SupportRequestType } from "@/types/support-request";
import { createSupportRequestSchema } from "@/validation-schemas/support-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const { success, data } = createSupportRequestSchema.safeParse(payload);

  if (!success) {
    return NextResponse.json({}, { status: 400 });
  }

  const requestExists = await supportRequestExists({
    email: data.email,
    mobileNumber: data.mobileNumber,
    reason: data.reason,
  });

  if (requestExists) {
    return NextResponse.json(
      {
        success: false,
        message: "We already have your contact. We'll reach out to you soon.",
      },
      { status: 200 }
    );
  }

  const supportRequest = await createSupportRequest(data);

  if (supportRequest) {
    sendSupportEmail(supportRequest);
    notifySupportTeam(supportRequest);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll contact you soon.",
      },
      { status: 200 }
    );
  }
}

const sendSupportEmail = async (supportRequest: SupportRequestType) => {
  if (supportRequest.reason === "hosting") {
    const { subject, html, text } = hostingAcknowledgement();

    await sendEmail({ to: supportRequest.email, subject, html, text });
  } else {
    const { html, subject, text } = tenantAcknowledgement();
    await sendEmail({ to: supportRequest.email, html, subject, text });
  }
};

const notifySupportTeam = async (supportRequest: SupportRequestType) => {
  const supportUsers = await getSupportUsers();
  if (supportUsers) {
    const supportUserEmails = supportUsers.map((user) => user.email).join(",");
    const { html, subject } = supportEmailTemplate({ request: supportRequest });

    await sendEmail({ to: supportUserEmails, subject, html });
  }
};
