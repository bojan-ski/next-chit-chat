"use server";

import { revalidatePath } from "next/cache";
import { User } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Member, Photo } from "@prisma/client";
import { memberProfileSchema } from "@/utils/schemas";
import { FormStatus, MemberFilters } from "@/types/types";
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

export const fetchAllMembersAction = async (filters?: MemberFilters) => {  
  // get user id
  const userId: string = await getUserIdAction();

  // prisma parameters 
  let prismaWhereParams: any = {
    NOT: {
      id: userId,
    },
  };
  
  // gender filter
  if (filters?.gender !== undefined) {
    prismaWhereParams.gender = filters.gender;
  }

  // age range filter
  if (filters?.minAge !== undefined || filters?.maxAge !== undefined) {
    const now = new Date();
    const currentYear = now.getFullYear();

    // min member age
    if (filters.minAge !== undefined) {
      const maxBirthYear = new Date(currentYear - filters.minAge, 11, 31);
      prismaWhereParams.dateOfBirth = {
        ...prismaWhereParams.dateOfBirth,
        lte: maxBirthYear,
      };
    }

    // max member age
    if (filters.maxAge !== undefined) {
      const minBirthYear = new Date(currentYear - filters.maxAge - 1, 0, 1);
      prismaWhereParams.dateOfBirth = {
        ...prismaWhereParams.dateOfBirth,
        gte: minBirthYear,
      };
    }
  }

  // get members
  const members: Member[] = await prisma.member.findMany({
    where: prismaWhereParams,
    orderBy: {
      createdAt: "desc",
    },
  });

  return members;
};

export async function getSelectedMemberDataAction(
  memberId: string
): Promise<(Member & { photoGallery: Photo[] }) | null> {
  return prisma.member.findFirst({
    where: {
      id: memberId,
    },
    include: {
      photoGallery: {
        where: {
          isApproved: true,
        },
      },
    },
  });
}
