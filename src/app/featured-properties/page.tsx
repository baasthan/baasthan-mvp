import { getAppliedPayingGuestFiltersByParams } from "@/lib/filters/paying-guest-filters";
import {
  getPayingGuestFilters,
  getPayingGuestInfoByFilters,
} from "@/repository/paying-guest";

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
          All Featured Properties
        </h1>

        {JSON.stringify(payingGuestInfo)}
      </div>
    </section>
  );
}
