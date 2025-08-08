import z from "zod";
import { SupportReasonEnum } from "../../prisma/generated/prisma";

export const createSupportRequestSchema = z.object({
  email: z.string().email(),
  mobileNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Invalid mobile number. It should be a 10-digit Indian number starting with 6-9"
    ),
  reason: z.nativeEnum(SupportReasonEnum),
});
