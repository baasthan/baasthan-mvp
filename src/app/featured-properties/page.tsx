import PayingGuestCard from "@/components/paying-guest/paying-guest-card";
import { APP_CONFIG } from "@/config";
import { getPayingGuestInfoByFilters } from "@/repository/paying-guest";

export default async function Page() {
  const payingGuestInfo = await getPayingGuestInfoByFilters({
    baasthanVerified: {
      equals: true,
    },
    reraRegistered: {
      equals: true,
    },
  });

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8 gap-8">
        <div className="flex flex-col md:flex-row text-4xl text-gray-900 mb-8 items-center justify-center gap-4">
          <h1 className="">Featured Properties</h1>
          <h1 className="text-primary font-bold">@{APP_CONFIG.APP_NAME}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payingGuestInfo &&
            payingGuestInfo.length > 0 &&
            payingGuestInfo.map((pgInfo) => (
              <PayingGuestCard
                key={pgInfo.id}
                {...pgInfo}
                startingPrice={pgInfo.startingPrice.toNumber()}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
