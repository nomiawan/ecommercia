import * as z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .min(3, { message: "First name must be at least of 3 characters" })
    .max(255, { message: "First name must not be more than 255 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .min(3, { message: "Last name must be at least of 3 characters" })
    .max(255, { message: "Last name must not be more than 255 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});
