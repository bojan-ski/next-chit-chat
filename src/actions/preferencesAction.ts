"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserClerkIdAction } from "./authActions";
import { preferencesSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";

export async function saveMemberPreferencesAction(
  initialState: FormStatus,
  formData: FormData
) {
  // get user id
  const userId: string = await getUserClerkIdAction();

  // run query
  try {
    // validate form data
    const cities = (formData.get("cities") as string) || "";
    const states = (formData.get("states") as string) || "";

    const rawData = {
      preferredGender: formData.get("preferredGender") as string,
      minAge: parseInt(formData.get("minAge") as string) || 18,
      maxAge: parseInt(formData.get("maxAge") as string) || 80,
      isSmoker: formData.has("isSmoker"),
      isVegan: formData.has("isVegan"),
      hasPets: formData.has("hasPets"),
      drinksAlcohol: formData.has("drinksAlcohol"),
      doesExercise: formData.has("doesExercise"),
      preferredCities: cities
        ? cities
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c.length > 0)
        : [],
      preferredStates: states
        ? states
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : [],
    };
    const validatedFields = preferencesSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const firstError =
        validatedFields.error.issues[0]?.message || "Validation failed";

      return {
        status: "error",
        message: firstError,
      };
    }

    // update/set member preferences
    const data = validatedFields.data;

    await prisma.memberPreferences.upsert({
      where: {
        memberId: userId,
      },
      update: data,
      create: {
        memberId: userId,
        ...data,
      },
    });

    return {
      status: "success",
      message: "Preferences set",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Preferences set error",
    };
  } finally {
    revalidatePath("/matches");
  }
}
