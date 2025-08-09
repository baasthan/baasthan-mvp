import AccessDenied from "@/components/access-denied";
import { AUTH_CONFIG } from "@/config";
import { SupportReasonEnumMap } from "@/constants/SupportReason";
import { auth } from "@/lib/auth";
import { getSupportTickets } from "@/repository/support";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!(session && session.user)) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    redirect(`/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true&redirect=/support`);
  }

  const { error, success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        support: ["update", "view"],
      },
    },
  });

  if (error || !success) {
    return <AccessDenied />;
  }

  const supportTickets = await getSupportTickets();
  return (
    <>
      <div className="bg-primary border-b border-gray-200 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Support Requests
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              With great power comes great responsibilities
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-2">
        <div className="w-full   overflow-auto p-2">
          {supportTickets ? (
            <table className="mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Request Id
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Email Address
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Mobile Number
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Reason
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Created At
                  </th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.mobileNumber}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {SupportReasonEnumMap[request.reason]}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.status}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.createdAt.toUTCString()}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.updatedAt.toUTCString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              className="flex flex-col flex-1 items-center justify-center mt-30
                     "
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                  No Request Raised as of yet.
                </h1>
                <p className="text-gray-600">
                  Help will always be given at Baathan to those who ask for it.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
