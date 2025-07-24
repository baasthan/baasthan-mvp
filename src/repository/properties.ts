// import { Prisma, PrismaClient } from "../../prisma/generated/prisma";

// const propertyWithAllRelations = Prisma.validator<Prisma.PropertyInfoInclude>()(
//   {
//     Location: true,
//     host: true,
//     PropertyAmenities: true,
//     PropertyImages: true,
//     Reviews: true,
//     Unit: true,
//   }
// );

// type PropertyInfoSelected = Prisma.PropertyInfoGetPayload<{
//   include: typeof propertyWithAllRelations;
// }>;

// const getPropertiesByUserId = async (userId: string) => {
//   const prisma = new PrismaClient();
//   return prisma.propertyInfo.findMany({
//     where: { hostId: userId },
//     include: {
//       Location: true,
//       host: true,
//       PropertyAmenities: true,
//       PropertyImages: true,
//       Reviews: true,
//       Unit: true,
//     },
//   });
// };

// const getProperties = () => {
//   const prisma = new PrismaClient();
//   return prisma.propertyInfo.findMany({
//     include: {
//       Location: true,
//       PropertyAmenities: true,
//       PropertyImages: true,
//       Reviews: true,
//       Unit: true,
//     },
//   });
// };

// export { getProperties, getPropertiesByUserId };
// export type { PropertyInfoSelected };
