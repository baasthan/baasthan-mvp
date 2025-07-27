import { PGGenderPolicyEnumMap } from "@/constants/PGGenderPolicyType";
import { PGOccupancyTypeEnumMap } from "@/constants/PGOccupancyType";
import { FilterConfig } from "@/types/filters";
import { NextResponse } from "next/server";
import {
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
  Prisma,
} from "../../../../../prisma/generated/prisma";

export function GET() {
  const publicFilters: FilterConfig[] = [];

  /** availableOccupancyType */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.availableOccupancyType,
    filterDisplayName: "Occupancy Type",
    filterType: "MULTI_SELECT",
    filterOptions: [
      {
        id: PGOccupancyTypeEnum.singleSharing,
        displayName: PGOccupancyTypeEnumMap[PGOccupancyTypeEnum.singleSharing],
      },
      {
        id: PGOccupancyTypeEnum.doubleSharing,
        displayName: PGOccupancyTypeEnumMap[PGOccupancyTypeEnum.doubleSharing],
      },
      {
        id: PGOccupancyTypeEnum.tripleSharing,
        displayName: PGOccupancyTypeEnumMap[PGOccupancyTypeEnum.tripleSharing],
      },
    ],
  });

  /** genderPolicy */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.genderPolicy,
    filterDisplayName: "Gender Policy",
    filterType: "SINGLE_SELECT",
    filterOptions: [
      {
        id: PGGenderPolicyEnum.male,
        displayName: PGGenderPolicyEnumMap[PGGenderPolicyEnum.male],
      },
      {
        id: PGGenderPolicyEnum.female,
        displayName: PGGenderPolicyEnumMap[PGGenderPolicyEnum.female],
      },
      {
        id: PGGenderPolicyEnum.coEd,
        displayName: PGGenderPolicyEnumMap[PGGenderPolicyEnum.coEd],
      },
    ],
  });

  /** startingPrice */
  //TODO : Implement Dynamic Range based on the available PGs
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.startingPrice,
    filterDisplayName: "Budget",
    filterType: "RANGE",
    minValue: 0,
    maxValue: 1000000,
  });

  /** baasthanVerified */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.baasthanVerified,
    filterDisplayName: "Baasthan Verified",
    filterType: "BOOLEAN",
    defaultValue: true,
  });

  /** reraRegistered */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.reraRegistered,
    filterDisplayName: "Rera Registered",
    filterType: "BOOLEAN",
    defaultValue: true,
  });

  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.amenities,
    filterDisplayName: "Amenities",
    filterType: "MULTI_SELECT",
    filterOptions: Object.entries(PGGenderPolicyEnumMap).map(
      ([key, value]) => ({ id: key, displayName: value })
    ),
  });

  /** amenities */
  // publicFilters.push({
  //   filterId: Prisma.PayingGuestInfoScalarFieldEnum.amenities,
  //   filterDisplayName: "Amenities",
  //   filterType: "MULTI_SELECT",
  //   filterOptions: [
  //     {
  //       id: PGAmenitiesEnum.ac,
  //       displayName: "Air Conditioning",
  //     },
  //     {
  //       id: PGAmenitiesEnum.bikeParking,
  //       displayName: "Bike Parking",
  //     },
  //     {
  //       id: PGAmenitiesEnum.carParking,
  //       displayName: "Car Parking",
  //     },
  //     {
  //       id: PGAmenitiesEnum.food,
  //       displayName: "Food Available",
  //     },
  //     {
  //       id: PGAmenitiesEnum.gym,
  //       displayName: "In-House Gym",
  //     },
  //     {
  //       id: PGAmenitiesEnum.laundary,
  //       displayName: "Laundary",
  //     },
  //     {
  //       id: PGAmenitiesEnum.powerBackup,
  //       displayName: "24x7 Pover Backup Available",
  //     },
  //     {
  //       id: PGAmenitiesEnum.security,
  //       displayName: "Best in class security",
  //     },
  //     {
  //       id: PGAmenitiesEnum.wifi,
  //       displayName: "High Speed Wifi",
  //     },
  //   ],
  // });

  /** preferedTenants */
  publicFilters.push({
    filterId: "preferedTenants",
    filterDisplayName: "Prefered Tenants",
    filterType: "MULTI_SELECT",
    filterOptions: [
      {
        id: PGPreferedTenantsEnum.students,
        displayName: "Students",
      },
      {
        id: PGPreferedTenantsEnum.workingProfessionals,
        displayName: "Working Professionals",
      },
    ],
  });

  /** washroomType */
  publicFilters.push({
    filterId: "washroomType",
    filterDisplayName: "Washroom",
    filterType: "SINGLE_SELECT",
    filterOptions: [
      {
        id: PGWashroomEnum.attached,
        displayName: "Attached",
      },
      {
        id: PGWashroomEnum.common,
        displayName: "Common Washroom",
      },
    ],
  });

  /** meals */
  publicFilters.push({
    filterId: Prisma.PayingGuestInfoScalarFieldEnum.meals,
    filterDisplayName: "Meals",
    filterType: "SINGLE_SELECT",
    filterOptions: [
      {
        id: PGMealsEnum.threeMeals,
        displayName: "Three Meals (Including Breakfast)",
      },
      {
        id: PGMealsEnum.twoMeals,
        displayName: "Two Meals (Lunch and Dinner)",
      },
      {
        id: PGMealsEnum.onlyDinner,
        displayName: "One Meal (Only Dinner)",
      },
    ],
  });

  return NextResponse.json(publicFilters);
}
