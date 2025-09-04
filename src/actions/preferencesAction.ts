"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserClerkIdAction } from "./authActions";
import { preferencesSchema } from "@/utils/schemas";
import { FormStatus, UserMatches } from "@/types/types";
import { MemberPreferences } from "@prisma/client";
import { MATCH_POINTS } from "@/lib/constants";

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

export const fetchPreferencesAction =
  async (): Promise<MemberPreferences | null> => {
    const userId: string = await getUserClerkIdAction();

    return prisma.memberPreferences.findFirst({
      where: {
        memberId: userId,
      },
    });
  };

export async function fetchUserMatchesAction(): Promise<UserMatches[]> {
  // get user id
  const userId: string = await getUserClerkIdAction();

  try {
    // fetch user preferences
    const currentUserPreferences:MemberPreferences | null = await fetchPreferencesAction();

    // if the user has not set preferences, return []
    if (!currentUserPreferences) return [];

    // fetch all other members and their preferences
    const otherMembers= await prisma.member.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      include: {
        memberPreferences: true,
      },
    });

    // calculate score for each member
    const otherMembersWithScore = otherMembers.map((member) => {
      let score: number = 0;
      const otherMemberPreferences: MemberPreferences[] = member.memberPreferences;

      // calc age from dateOfBirth
      const today = new Date();
      const birthDate = new Date(member.dateOfBirth);
      let age: number = today.getFullYear() - birthDate.getFullYear();
      const month: number = today.getMonth() - birthDate.getMonth();

      if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // check age
      if (
        age &&
        currentUserPreferences.minAge &&
        currentUserPreferences.maxAge
      ) {
        if (
          age >= currentUserPreferences.minAge &&
          age <= currentUserPreferences.maxAge
        ) {
          score += MATCH_POINTS.ageRange;
        } else {
          score += MATCH_POINTS.ageMismatch;
        }
      }

      // check gender
      if (
        currentUserPreferences.preferredGender &&
        currentUserPreferences.preferredGender == member.gender &&
        currentUserPreferences.preferredGender !=
          otherMemberPreferences.preferredGender
      ) {
        score += MATCH_POINTS.gender;
      } else {
        score += MATCH_POINTS.genderMismatch;
      }

      // check cities
      if (currentUserPreferences.preferredCities?.includes(member.city)) {
        score += MATCH_POINTS.cities;
      }

      // check states
      if (currentUserPreferences.preferredStates?.includes(member.state)) {
        score += MATCH_POINTS.states;
      }

      // check if smoker
      if (currentUserPreferences.isSmoker === otherMemberPreferences.isSmoker) {
        score += MATCH_POINTS.isSmoker;
      }

      // check if vegan
      if (currentUserPreferences.isVegan === otherMemberPreferences.isVegan) {
        score += MATCH_POINTS.isVegan;
      }

      // check if has pets
      if (currentUserPreferences.hasPets === otherMemberPreferences.hasPets) {
        score += MATCH_POINTS.hasPets;
      }

      // check if drinks alcohol
      if (
        currentUserPreferences.drinksAlcohol ===
        otherMemberPreferences.drinksAlcohol
      ) {
        score += MATCH_POINTS.drinksAlcohol;
      }

      // check if exercises
      if (
        currentUserPreferences.doesExercise ===
        otherMemberPreferences.doesExercise
      ) {
        score += MATCH_POINTS.doesExercise;
      }

      return { ...member, score, age };
    });

    // sort members by score
    otherMembersWithScore.sort((a, b) => b.score - a.score);

    return otherMembersWithScore;
  } catch (error) {
    throw new Error("Failed to fetch matches.");
  }
}
