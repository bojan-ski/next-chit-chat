import { z } from "zod";
import { calculateMemberAge } from "./utils";

export const forbiddenWordSchema = z.object({
  forbidden_word: z
    .string()
    .min(2, "New forbidden word must be at least 2 characters long."),
});

export const memberProfileSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long.")
    .max(30, "Max length for username is 30 characters"),
  gender: z.enum(["male", "female"], "Gender must be either male or female"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .transform((dateString) => {
      return new Date(dateString);
    })
    .refine(
      (date) => {
        const age = calculateMemberAge(date);
        return age >= 18;
      },
      {
        message: "You must be at least 18.",
      }
    ),
  city: z
    .string()
    .min(2, "City must be at least 2 characters long.")
    .max(30, "Max length for city is 30 characters"),
  state: z
    .string()
    .min(2, "State must be at least 2 characters long.")
    .max(30, "Max length for state is 30 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long.")
    .max(400, "Max length for description is 400 characters"),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 4 * 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 4MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export const newMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(200, "Max length is 200 characters"),
});

export const newReportSchema = z.object({
  report: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(200, "Max length is 200 characters"),
});

export const preferencesSchema = z
  .object({
    preferredGender: z.enum(
      ["male", "female"],
      "Gender must be either male or female"
    ),
    minAge: z
      .number()
      .min(18, "Minimum age must be at least 18")
      .max(80, "Minimum age cannot exceed 80"),
    maxAge: z
      .number()
      .min(18, "Maximum age must be at least 18")
      .max(80, "Maximum age cannot exceed 80"),
    isSmoker: z.boolean().default(false),
    isVegan: z.boolean().default(false),
    hasPets: z.boolean().default(false),
    drinksAlcohol: z.boolean().default(false),
    doesExercise: z.boolean().default(false),
    preferredCities: z.array(z.string().trim()).default([]),
    preferredStates: z.array(z.string().trim()).default([]),
  })
  .refine((data) => data.minAge <= data.maxAge, {
    message: "Minimum age must be less than or equal to maximum age",
    path: ["minAge"],
  });
