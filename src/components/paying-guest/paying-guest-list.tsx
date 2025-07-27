// "use client";

// import { getAppliedPayingGuestFiltersBySearchParams } from "@/lib/filters/paying-guest-filters";
// import { getPayingGuestInfoByFilters } from "@/repository/paying-guest";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Prisma } from "../../../prisma/generated/prisma";

// const PayingGuestList = () => {
//   const searchParams = useSearchParams();

//   const [properties, setProperties] = useState<any>();

//   const fetchProperties = async (
//     appliedFilters: Prisma.PayingGuestInfoWhereInput
//   ) => {
//     const result = await getPayingGuestInfoByFilters(appliedFilters);
//     console.log("result===>", result);
//     if (result) {
//       setProperties(result);
//     }
//   };
//   useEffect(() => {
//     const appliedFilters =
//       getAppliedPayingGuestFiltersBySearchParams(searchParams);

//     fetchProperties(appliedFilters);
//   }, [searchParams]);
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {JSON.stringify(properties)}
//     </div>
//   );
// };

// export default PayingGuestList;
