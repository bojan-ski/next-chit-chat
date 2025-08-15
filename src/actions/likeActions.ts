"use server";

import prisma from "@/lib/prisma";
import { getUserIdAction } from "./authActions";
import { Member } from "@prisma/client";

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
    throw new Error("There was an error with Like toggle feature")
  }
}

export async function checkIfMemberIsLikedAction(
  targetMemberId: string
): Promise<boolean> {
  const userId: string = await getUserIdAction();

  const isLiked = await prisma.like.findFirst({
    where: {
      sourceMemberId: userId,
      targetMemberId,
    },
  });

  return isLiked ? true : false;
}

export async function fetchSourceLikesAction(): Promise<Member[]> {
  const userId: string = await getUserIdAction();

  const sourceLikes = await prisma.like.findMany({
    where: {
      sourceMemberId: userId,
    },
    select: {
      targetMember: true,
    },
  });

  return sourceLikes.map(({ targetMember }) => targetMember);
}

export async function fetchTargetLikesAction(): Promise<Member[]> {
  const userId: string = await getUserIdAction();

  const targetLikes = await prisma.like.findMany({
    where: {
      targetMemberId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return targetLikes.map(({ sourceMember }) => sourceMember);
}

export async function fetchMutualLikesAction(): Promise<Member[]> {
  const userId = await getUserIdAction();

  const mutualLikes = await prisma.member.findMany({
    where: {
      id: {
        in: (
          await prisma.like.findMany({
            where: { sourceMemberId: userId },
            select: { targetMemberId: true },
          })
        ).map((like) => like.targetMemberId),
      },
      sourceLikes: {
        some: { targetMemberId: userId },
      },
    },
  });

  return mutualLikes;
}
