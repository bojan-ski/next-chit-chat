"use server";

import prisma from "@/lib/prisma";
import { Member, Photo } from "@prisma/client";
import { MemberFilters } from "@/types/types";
import { getUserIdAction } from "./authActions";

export async function fetchAllMembersAction(
  filters?: MemberFilters,
  skip?: number,
  take: number = 12
): Promise<Member[]> {
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
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  return members;
}

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
