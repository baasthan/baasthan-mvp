import { AUTH_CONFIG } from "@/config";
import { SupportReasonEnumMap } from "@/constants/SupportReason";
import { auth } from "@/lib/auth";
import { getSupportRequestsByEmail } from "@/repository/support";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!(session && session.user)) {
    const searchParams = new URLSearchParams();
    searchParams.set(AUTH_CONFIG.SIGN_IN_PROMPT, "true");
    redirect(`/?${AUTH_CONFIG.SIGN_IN_PROMPT}=true&redirect=/support`);
  }

  const supportRequests = await getSupportRequestsByEmail({
    email: session.user.email,
  });

  return (
    <div>
      <div className="bg-primary border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Your Support Requests
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Easily view and manage all the support requests you&apos;ve made —
              we&apos;re here to help every step of the way.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex">
        <div className="w-full   overflow-auto p-2">
          {supportRequests && (
            <table className="mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">
                    Request Id
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
                {supportRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {SupportReasonEnumMap[request.reason]}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.status}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.createdAt.toISOString()}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                      {request.updatedAt.toISOString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
