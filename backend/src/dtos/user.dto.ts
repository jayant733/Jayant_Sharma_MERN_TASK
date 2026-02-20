import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  gender: z.enum(["Male", "Female"]),
  status: z.enum(["Active", "Inactive"]).optional(),
  location: z.string().min(2),
  profileImage: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();
