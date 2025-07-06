import z from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(15, "Maximum 15 characters allowed"),
});

export default signInSchema;
