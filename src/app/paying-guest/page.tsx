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
        <div className="flex flex-row flex-wrap gap-4">
          {payingGuestInfo &&
            payingGuestInfo.length > 0 &&
            payingGuestInfo.map((pgInfo) => (
              <PayingGuestCard key={pgInfo.id} {...pgInfo} />
            ))}
        </div>
      </div>
    </section>
  );
}
