import z from "zod";
import {
  PGAmenitiesEnum,
  PGGenderPolicyEnum,
  PGMealsEnum,
  PGOccupancyTypeEnum,
  PGPreferedTenantsEnum,
  PGWashroomEnum,
} from "../../prisma/generated/prisma";

export const payingGuestFilterSchema = z.object({
  availableOccupancyType: z
    .union([
      z.array(z.nativeEnum(PGOccupancyTypeEnum)),
      z.nativeEnum(PGOccupancyTypeEnum),
    ])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .refine((v) => v.length > 0)
    .optional(),
  genderPolicy: z.nativeEnum(PGGenderPolicyEnum).optional(),
  startingPrice: z.coerce.number().optional(),
  baasthanVerified: z.coerce.boolean().optional(),
  reraRegistered: z.coerce.boolean().optional(),
  amenities: z
    .union([
      z.array(z.nativeEnum(PGAmenitiesEnum)),
      z.nativeEnum(PGAmenitiesEnum),
    ])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .refine((v) => v.length > 0)
    .optional(),
  preferedTenants: z
    .union([
      z.array(z.nativeEnum(PGPreferedTenantsEnum)),
      z.nativeEnum(PGPreferedTenantsEnum),
    ])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .refine((v) => v.length > 0)
    .optional(),
  washroomType: z.nativeEnum(PGWashroomEnum).optional(),
  meals: z.nativeEnum(PGMealsEnum).optional(),
  pincode: z.string().length(6).optional(),
});
