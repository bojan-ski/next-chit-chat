"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormStatus } from "@/types/types";
import { forbiddenWordSchema } from "@/utils/schemas";
import { ForbiddenWord } from "@prisma/client";

export async function addNewForbiddenWordAction(
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = forbiddenWordSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const errorMessage =
        validatedFields.error.issues[0]?.message || "Validation failed";
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

export const fetchForbiddenWordsAction = async (): Promise<ForbiddenWord[]> => {
  const forbiddenWords: ForbiddenWord[] = await prisma.forbiddenWord.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return forbiddenWords;
};

export const deleteForbiddenWordAction = async (
  wordId: string
): Promise<void> => {
  try {
    await prisma.forbiddenWord.delete({
      where: {
        id: wordId,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("/forbidden-words");
  }
};
