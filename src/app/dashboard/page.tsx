import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccessDenied from "../access-denied/page";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    redirect(`${APP_CONFIG.BASE_URL}/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true`);
  }

  const { error, success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        appDashBoard: ["view"],
      },
    },
  });

  if (!success || error) {
    return AccessDenied();
  }

  return <div>Dashboard</div>;
};

export default Page;
