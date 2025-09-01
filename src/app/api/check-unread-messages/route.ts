import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ hasUnreadMessages: false });

  try {
    const unreadCount: number = await prisma.message.count({
      where: {
        isRead: false,
        senderId: {
          not: userId,
        },
        conversation: {
          OR: [
            {
              participantOneId: userId,
            },
            {
              participantTwoId: userId,
            },
          ],
        },
      },
    });

    return NextResponse.json({ hasUnreadMessages: unreadCount > 0 });
  } catch (error) {
    return NextResponse.json({ hasUnreadMessages: false });
  }
}
