import { z } from "zod";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
} from "../../prisma/generated/prisma";

export const createPGSchema = z.object({
  propertyName: z
    .string()
    .min(3, "Property name must be at least 3 characters"),
  securityDeposite: z.coerce
    .number()
    .gt(0, { message: "Enter a valid Amount" })
    .refine((val) => !Number.isNaN(val), { message: "Amount is required" }),
  maintaince: z.coerce
    .number()
    .gt(0, { message: "Enter a valid Amount" })
    .refine((val) => !Number.isNaN(val), { message: "Amount is required" }),
  availableOccupancyType: z
    .array(z.nativeEnum(PGOccupancyTypeEnum))
    .nonempty("At least one occupancy type is required"),
  singleSharingPrice: z.coerce.number().optional(),
  doubleSharingPrice: z.coerce.number().optional(),
  trippleShareingPrice: z.coerce.number().optional(),
  genderPolicy: z.nativeEnum(PGGenderPolicyEnum),
  startingPrice: z.coerce
    .number()
    .gt(0, { message: "Enter a valid price" })
    .refine((val) => !Number.isNaN(val), { message: "Price is required" }),
  reraRegistered: z.boolean(),
  reraRegistrationNumber: z.string().optional(),
  amenities: z.array(z.nativeEnum(PGAmenitiesEnum)),
  preferedTenants: z.array(z.nativeEnum(PGPreferedTenantsEnum)),
  washroomType: z.nativeEnum(PGWashroomEnum),
  floors: z.coerce.number().min(1, "Must have at least 1 floor"),
  operatingSince: z.coerce
    .number()
    .gte(1900, "Invalid year")
    .lte(new Date().getFullYear(), {
      message: "Future year not allowed",
    }),
  meals: z.nativeEnum(PGMealsEnum),
  noticePeriodInDays: z.coerce
    .number()
    .gt(0, "Enter a valid Notice Period")
    .lte(90, "Should be less than 90 days"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  locality: z.string().min(1, "Locality is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid Pincode"),
  images: z.any().optional(),
});

export type PGFormData = z.infer<typeof createPGSchema>;
