import {z} from "zod";
import { PGGenderPolicyEnum, PGOccupancyTypeEnum, PGAmenitiesEnum, PGPreferedTenantsEnum, PGWashroomEnum, PGMealsEnum } from "../../prisma/generated/prisma";


export const pgSchema = z.object({
  propertyName: z
    .string()
    .min(3, "Property name must be at least 3 characters"),
  availableOccupancyType: z
    .array(z.nativeEnum(PGOccupancyTypeEnum))
    .nonempty("At least one occupancy type is required"),
  genderPolicy: z.nativeEnum(PGGenderPolicyEnum),
  startingPrice: z.coerce.number().min(0, "Price must be greater than 0"),
  baasthanVerified: z.boolean(),
  reraRegistered: z.boolean(),
  reraRegistrationNumber: z.string().optional(),
  amenities: z.array(z.nativeEnum(PGAmenitiesEnum)),
  preferedTenants: z.array(z.nativeEnum(PGPreferedTenantsEnum)),
  washroomType: z.nativeEnum(PGWashroomEnum),
  floors: z.coerce.number().min(1, "Must have at least 1 floor"),
  operatingSince: z.coerce.number().gte(1900, "Invalid year"),
  meals: z.nativeEnum(PGMealsEnum),
  noticePeriodInDays: z.coerce
    .number()
    .min(0, "Notice period cannot be negative"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  locality: z.string().min(1, "Locality is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  images: z.any().optional(),
});

export type PGFormData = z.infer<typeof pgSchema>;