import AccessDenied from "@/app/access-denied/page";
import { auth } from "@/lib/auth";
// import {
//   getPropertiesByUserId,
//   PropertyInfoSelected,
// } from "@/repository/properties";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!(session && session.user)) {
    return <p>please login</p>;
  }
  const { error, success } = await auth.api.userHasPermission({
    body: {
      permissions: {
        property: ["insert", "update"],
      },
    },
  });
  if (!success || error) {
    return AccessDenied();
  }

  // const ownProperties: PropertyInfoSelected[] = await getPropertiesByUserId(
  //   session.user.id
  // );
  // console.log("ownProperties===>", ownProperties);

  return (
    <div className="container flex flex-1 flex-col py-8">
      {/* <PropertyDashboard ownProperties={ownProperties} /> */}
    </div>
  );
};

export default page;
