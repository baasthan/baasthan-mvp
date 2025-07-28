import z from "zod";

export const hostContactDetailsSchema = z.object({
  email: z.string().email(),
  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Invalid mobile number. It should be a 10-digit Indian number starting with 6-9"
    ),
});
