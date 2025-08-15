"use server";

import prisma from "@/lib/prisma";
import { getUserIdAction } from "./authActions";

export async function toggleLikeMemberAction(
  targetMemberId: string,
  isLiked: boolean
): Promise<void> {
  try {
    const userId: string = await getUserIdAction();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceMemberId_targetMemberId: {
            sourceMemberId: userId,
            targetMemberId: targetMemberId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceMemberId: userId,
          targetMemberId: targetMemberId,
        },
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function checkIfMemberIsLikedAction(
  targetMemberId: string
): Promise<boolean> {
  try {
    const userId: string = await getUserIdAction();

    const isLiked = await prisma.like.findFirst({
      where: {
        sourceMemberId: userId,
        targetMemberId,
      },
    });

    return isLiked ? true : false;
  } catch (error) {
    throw error;
  }
}

async function fetchSourceLikesAction(userId: string) {
  const sourceLikes = await prisma.like.findMany({
    where: {
      sourceMemberId: userId,
    },
    select: {
      targetMember: true,
    },
  });

  return sourceLikes.map((member) => member.targetMember);
}

async function fetchTargetLikesAction(userId: string) {
  const targetLikes = await prisma.like.findMany({
    where: {
      targetMemberId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return targetLikes.map((member) => member.sourceMember);
}

async function fetchMutualLikesAction(userId: string) {
  const likedMembers = await prisma.like.findMany({
    where: {
      sourceMemberId: userId,
    },
    select: {
      targetMemberId: true,
    },
  });

  const likedIds = likedMembers.map((user) => user.targetMemberId);

  const mutualLikes = await prisma.like.findMany({
    where: {
      AND: [
        {
          targetMemberId: userId,
        },
        {
          sourceMemberId: {
            in: likedIds,
          },
        },
      ],
    },
    select: {
      sourceMember: true,
    },
  });

  return mutualLikes.map((member) => member.sourceMember);
}
