import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .min(10, "Mobile must be at least 10 digits")
    .max(15, "Mobile too long"),
  gender: z.enum(["Male", "Female"]),
  status: z.enum(["Active", "Inactive"]),
  location: z.string().min(2, "Location is required"),
});

export type UserFormValues = z.infer<typeof userSchema>;
