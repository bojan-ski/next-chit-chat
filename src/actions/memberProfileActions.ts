"use server";

import { revalidatePath } from "next/cache";
import { User } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Member } from "@prisma/client";
import { memberProfileSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";
import { getUserDataAction, getUserIdAction } from "./authActions";

export async function checkIfMemberExistsAction({
  userId,
}: {
  userId: string;
}): Promise<Member | null> {
  return prisma.member.findFirst({
    where: {
      id: userId,
    },
  });
}

export async function setProfileDataAction(
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  // get user data
  const user: User = await getUserDataAction();

  // if all good - run query
  try {
    // validate form data
    const rawData = Object.fromEntries(formData);
    const validatedFields = memberProfileSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const firstError =
        validatedFields.error.issues[0]?.message || "Validation failed";

      return {
        status: "error",
        message: firstError,
      };
    }

    // extract form data & user/clerk data
    const { username, gender, dateOfBirth, city, state, description } =
      validatedFields.data;
    const userId = user?.id;
    const profileImage = user?.imageUrl;

    // check if user is member
    const existingMember = await checkIfMemberExistsAction({ userId });

    if (existingMember) {
      // update existing member - profile data
      await prisma.member.update({
        where: {
          id: userId,
        },
        data: {
          username,
          profileImage,
          gender,
          dateOfBirth,
          city,
          state,
          description,
        },
      });
    } else {
      // create member - profile data
      await prisma.member.create({
        data: {
          id: userId,
          username,
          profileImage,
          gender,
          dateOfBirth,
          city,
          state,
          description,
        },
      });
    }

    return {
      status: "success",
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "There was an error updating your profile",
    };
  } finally {
    revalidatePath("/profile-details");
  }
}

export const fetchProfileDataAction = async (): Promise<Member | null> => {
  const userId: string = await getUserIdAction();

  return prisma.member.findFirst({
    where: {
      id: userId,
    },
  });
};
