import { z } from "zod";

export const forbiddenWordSchema = z.object({
  forbidden_word: z.string().min(2, {
    message: "New forbidden word must be at least 2 characters long.",
  }),
});

export const memberProfileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long.",
    })
    .max(40, {
      message: "Max length for username is 40 characters",
    }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters long.",
    })
    .max(40, {
      message: "Max length for city is 40 characters",
    }),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters long.",
    })
    .max(40, {
      message: "Max length for state is 40 characters",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long.",
    })
    .max(500, {
      message: "Max length for description is 500 characters",
    }),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
