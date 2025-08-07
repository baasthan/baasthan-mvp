import AccessDenied from "@/app/access-denied/page";
import HouseRules from "@/components/paying-guest/registration/house-rules";
import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { auth } from "@/lib/auth";
import { getPayingGuestInfoById } from "@/repository/paying-guest";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import z from "zod";

type Props = {
  params: Promise<{ id: string }>;
};

const PayingGuestDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const isValidId = z.string().uuid().safeParse(id).success;
  if (!isValidId) {
    return redirect("/");
  }
  const session = await auth.api.getSession({ headers: await headers() });

  if (!(session && session.user.id)) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    return redirect(
      `${APP_CONFIG.BASE_URL}/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true`
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

  if (!success || error) {
    return AccessDenied();
  }

  const payingGuestInfo = await getPayingGuestInfoById(id);

  if (!payingGuestInfo) {
    return notFound();
  }

  if (session.user.id !== payingGuestInfo.user.id) {
    return AccessDenied();
  }

  return (
    <div>
      <div className="bg-primary border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Register Your PG
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              List your paying guest accommodation and connect with potential
              tenants
            </p>
          </div>
        </div>
      </div>
      <div className=" container mx-auto p-2">
        <HouseRules id={id} />
      </div>
    </div>
  );
};

export default PayingGuestDetailsPage;
