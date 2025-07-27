import DesktopFilter from "@/components/filters/desktop-filter";
import PayingGuestCard from "@/components/paying-guest/paying-guest-card";
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
      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8 gap-8  ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Paying Guest @Baasthan
        </h1>
        <Suspense>
          <DesktopFilter filters={filters} />
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
