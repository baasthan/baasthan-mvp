import AccessDenied from "@/components/access-denied";
import ListYourPG from "@/components/home/list-your-pg";
import RegistrationForm from "@/components/paying-guest/registration/registration-form";
import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PGRegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    redirect(
      `${APP_CONFIG.BASE_URL}/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true&redirect=/register-pg`
    );
  }

  const { error, success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        property: ["insert"],
      },
    },
  });

  if (error || !success) {
    return <AccessDenied listYouPg={<ListYourPG />} />;
  }

  return <RegistrationForm />;
}
