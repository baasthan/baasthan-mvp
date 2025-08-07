import AccessDenied from "@/components/access-denied";
import PayingGuestCard from "@/components/paying-guest/paying-guest-card";
import { AUTH_CONFIG } from "@/config";
import { auth } from "@/lib/auth";
import { getPayingGuestByUserId } from "@/repository/paying-guest";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    redirect(`/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true&redirect=/host/dashboard`);
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
    return <AccessDenied />;
  }

  const ownPayingGuestInfo = await getPayingGuestByUserId(session.user.id);

  return (
    <div className=" flex flex-1 flex-col gap-4  mx-auto">
      <div className="bg-primary border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Your Properties
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Easily manage the properties you’ve listed for paying guests.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ownPayingGuestInfo &&
          ownPayingGuestInfo.length > 0 &&
          ownPayingGuestInfo.map((pgInfo) => (
            <PayingGuestCard
              key={pgInfo.id}
              {...pgInfo}
              startingPrice={pgInfo.startingPrice.toNumber()}
              maintaince={pgInfo.maintaince.toNumber()}
              securityDeposite={pgInfo.securityDeposite.toNumber()}
              singleSharingPrice={pgInfo.singleSharingPrice.toNumber()}
              doubleSharingPrice={pgInfo.doubleSharingPrice.toNumber()}
              trippleShareingPrice={pgInfo.trippleShareingPrice.toNumber()}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
