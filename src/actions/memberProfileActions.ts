"use server";

import prisma from "@/lib/prisma";
import { FormStatus } from "@/types/types";
import { memberProfileSchema } from "@/utils/schemas";
import { revalidatePath } from "next/cache";

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
  // extract clerk id
  const userId = formData.get("userId") as string;

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
    const { userId: _, ...dataToValidate } = rawData;
    const validatedFields = memberProfileSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
      const firstError =
        validatedFields.error.issues[0]?.message || "Validation failed";
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
      // update existing member profile data
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
