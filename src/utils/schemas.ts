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
