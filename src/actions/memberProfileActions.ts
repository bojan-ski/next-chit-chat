"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { FormStatus } from "@/types/types";
import { memberProfileSchema } from "@/utils/schemas";

export async function checkIfMemberExistsAction({
  userId,
}: {
  userId: string;
}) {
  return prisma.member.findFirst({
    where: {
      clerkId: userId,
    },
  });
}

export async function setProfileDataAction(
  initialState: FormStatus,
  formData: FormData
): Promise<FormStatus> {
  // get clerk id from clerk
  const userId = (await auth()).userId;
  if (!userId) {
    return {
      status: "error",
      message: "Account error",
    };
  }

  // if all good - run query
  try {
    // validate form data
    const rawData = Object.fromEntries(formData);
    const validatedFields = memberProfileSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const firstError = validatedFields.error.issues[0]?.message || "Validation failed";

      return {
        status: "error",
        message: firstError,
      };
    }

    // extract form data
    const { username, city, state, description } = validatedFields.data;

    // check if user is member
    const existingMember = await checkIfMemberExistsAction({ userId });

    if (existingMember) {
      // update existing member - profile data
      await prisma.member.update({
        where: {
          clerkId: userId,
        },
        data: {
          username,
          city,
          state,
          description,
        },
      });
    } else {
      // create member - profile data
      await prisma.member.create({
        data: {
          clerkId: userId,
          username,
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

export const fetchProfileDataAction = async () => {
  // get clerk id from clerk
  const userId = (await auth()).userId;
  if (!userId) return null;

  // if all good - run query
  try {
    return prisma.member.findFirst({
      where: {
        clerkId: userId,
      },
    });
  } catch (error) {
    return null;
  }
};
