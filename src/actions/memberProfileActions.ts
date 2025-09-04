"use server";

import { revalidatePath } from "next/cache";
import { User } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Member } from "@prisma/client";
import { memberProfileSchema } from "@/utils/schemas";
import { FormStatus } from "@/types/types";
import { getUserClerkDataAction, getUserClerkIdAction } from "./authActions";

export async function checkIfMemberExistsAction(
  userId: string
): Promise<Member | null> {
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
  // get user clerk data
  const user: User = await getUserClerkDataAction();

  // run query
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

    // update/set member profile data
    const data = validatedFields.data;
    const userId: string = user?.id;
    const profileImage: string = user?.imageUrl;

    await prisma.member.upsert({
      where: {
        id: userId,
      },
      update: {
        profileImage,
        ...data,
      },
      create: {
        id: userId,
        profileImage,
        ...data,
      },
    });

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
  const userId: string = await getUserClerkIdAction();

  return prisma.member.findFirst({
    where: {
      id: userId,
    },
  });
};
