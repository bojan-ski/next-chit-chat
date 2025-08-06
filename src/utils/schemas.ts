import { z } from "zod";

export const forbiddenWordSchema = z.object({
  forbidden_word: z.string().min(2, {
    message: "New forbidden word must be at least 2 characters long.",
  }),
});

