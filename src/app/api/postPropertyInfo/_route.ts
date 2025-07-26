// // REQUEST FORMAT

// // https://<your-url>api/postPropertySearch

// // PLEASE NOTE:
// // - Request body to be in json format.
// // - Sample Json body:

// // {
// //   "propertyName": "Green Nest PG",
// //   "hostId": "BVm7U51vbPDShkgS40TnuMvV0EgABfVI",
// //   "availableOccupancyType": ["singleSharing", "doubleSharing"],
// //   "genderPolicy": "male",
// //   "preferedTenants": ["students"],
// //   "meals": "threeMeals",
// //   "baasthanVerified": true,
// //   "reraRegistered": true,
// //   "reraRegistrationNumber": "MH12AB1234",
// //   "floors": 2,
// //   "startingPrice": 7500.00,
// //   "operatingSince": 2019,
// //   "noticePeriodInDays": 15,
// //   "washroomType": "attached",
// //   "amenities": [
// //     "wifi",
// //     "ac",
// //     "laundary",
// //     "security",
// //     "gym",
// //     "food",
// //     "powerBackup"
// //   ],
// //   "addressLine1": "123 Green Street",
// //   "addressLine2": "Near City Mall",
// //   "locality": "Hinjewadi",
// //   "city": "Pune",
// //   "district": "Pune",
// //   "state": "Maharashtra",
// //   "country": "India",
// //   "pincode": "411057"

// // }

// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "../../../../prisma/generated/prisma";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const requiredFields = [
//       "propertyName",
//       "hostId",
//       "availableOccupancyType",
//       "genderPolicy",
//       "startingPrice",
//       "baasthanVerified",
//       "reraRegistered",
//       "amenities",
//       "preferedTenants",
//       "washroomType",
//       "floors",
//       "operatingSince",
//       "meals",
//       "noticePeriodInDays",
//       "addressLine1",
//       "locality",
//       "city",
//       "district",
//       "state",
//       "country",
//       "pincode",
//     ];

//     for (const field of requiredFields) {
//       if (body[field] === undefined || body[field] === null) {
//         return NextResponse.json(
//           { error: `Missing required field: ${field}` },
//           { status: 400 }
//         );
//       }
//     }

//     const optionalFields = ["reraRegistrationNumber", "addressLine2"];

//     const data: unknown = {
//       propertyName: body.propertyName,
//       hostId: body.hostId,
//       availableOccupancyType: body.availableOccupancyType, // Should be array of PGOccupancyTypeEnum
//       genderPolicy: body.genderPolicy, // Should be PGGenderPolicyEnum
//       startingPrice: body.startingPrice,
//       baasthanVerified: body.baasthanVerified,
//       reraRegistered: body.reraRegistered,
//       amenities: body.amenities,
//       preferedTenants: body.preferedTenants,
//       washroomType: body.washroomType,
//       floors: body.floors,
//       operatingSince: body.operatingSince,
//       meals: body.meals,
//       noticePeriodInDays: body.noticePeriodInDays,
//       addressLine1: body.addressLine1,
//       locality: body.locality,
//       city: body.city,
//       district: body.district,
//       state: body.state,
//       country: body.country,
//       pincode: body.pincode,
//     };
//     for (const field of optionalFields) {
//       if (body[field] !== undefined) {
//         data[field] = body[field];
//       }
//     }

//     const created = await prisma.payingGuestInfo.create({
//       data,
//     });

//     return NextResponse.json(created, { status: 201 });
//   } catch (error: any) {
//     if (error instanceof SyntaxError) {
//       return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//     }

//     if (
//       error.code === "P2009" ||
//       error.code === "P2002" ||
//       error.code === "P2025"
//     ) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     console.error("Error creating payingGuestInfo:", error);
//     return NextResponse.json(
//       { error: "Failed to create property" },
//       { status: 500 }
//     );
//   }
// }
