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
