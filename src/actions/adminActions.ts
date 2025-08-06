"use server";

import { FormStatus } from "@/types/types";
import { forbiddenWordSchema } from "@/utils/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNewForbiddenWordAction(
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = forbiddenWordSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.issues[0]?.message || "Validation failed";
      return {
        status: "error",
        message: errorMessage,
      };
    }

    await prisma.forbiddenWord.create({
      data: {
        word: validatedFields.data?.forbidden_word,
      },
    });

    return {
      status: "success",
      message: "New forbidden word added",
    };
  } catch (error) {
    return {
      status: "error",
      message: "There was an error adding a new forbidden word",
    };
  } finally {
    revalidatePath("/forbidden-words");
  }
}
