import Filter from "@/components/filters/filter";
import PayingGuestCard from "@/components/paying-guest/paying-guest-card";
import { APP_CONFIG } from "@/config";
import { getAppliedPayingGuestFiltersByParams } from "@/lib/filters/paying-guest-filters";
import {
  getPayingGuestFilters,
  getPayingGuestInfoByFilters,
} from "@/repository/paying-guest";

import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await getPayingGuestFilters();
  const appliedFilters = await getAppliedPayingGuestFiltersByParams(
    searchParams
  );

  const payingGuestInfo = await getPayingGuestInfoByFilters(appliedFilters);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8 gap-8">
        <div className="flex flex-col md:flex-row text-4xl text-gray-900 mb-8 items-center justify-center gap-4">
          <h1 className="">Paying Guest</h1>
          <h1 className="text-primary font-bold">@{APP_CONFIG.APP_NAME}</h1>
        </div>
        <Suspense>
          <Filter filters={filters} />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payingGuestInfo &&
            payingGuestInfo.length > 0 &&
            payingGuestInfo.map((pgInfo) => (
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
    </section>
  );
}
