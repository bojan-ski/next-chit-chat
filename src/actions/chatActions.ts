"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { Conversation, Message } from "@prisma/client";
import { ConversationAndMessages } from "@/types/types";
import { getUserIdAction } from "./authActions";

export async function fetchCurrentUserConversationsAction(): Promise<
  (Conversation & { unreadCount: number })[]
> {
  const userId: string = await getUserIdAction();

  // Fetch conversations
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { participantOneId: userId },
        { participantTwoId: userId },
      ],
    },
    include: {
      participantOne: true,
      participantTwo: true,
      messages: {
        where: {
          isRead: false,
          NOT: { senderId: userId }, // only messages received by current user
        },
        select: { id: true }, // we only need to count, not full message
      },
    },
  });

  // Map to add unread count
  return conversations.map((conv) => ({
    ...conv,
    unreadCount: conv.messages.length,
  }));
}

export async function createOrGetConversationAction(
  otherUserId: string
): Promise<ConversationAndMessages> {
  try {
    // get user id
    const userId: string = await getUserIdAction();

    // check if conversation already exists
    let conversation: ConversationAndMessages | null =
      await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              participantOneId: userId,
              participantTwoId: otherUserId,
            },
            {
              participantOneId: otherUserId,
              participantTwoId: userId,
            },
          ],
        },
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  profileImage: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          participantOne: {
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
          participantTwo: {
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
        },
      });

    // create conversation if does not exist
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantOneId: userId,
          participantTwoId: otherUserId,
        },
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  profileImage: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          participantOne: {
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
          participantTwo: {
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
        },
      });
    }

    return conversation;
  } catch (error) {
    throw new Error("Failed to create or get conversation");
  }
}

export async function sendMessageAction(
  conversationId: string,
  formData: FormData
): Promise<void> {
  try {
    // get user id
    const userId: string = await getUserIdAction();

    // get form data - message
    const messageContent = formData.get("message")?.toString().trim() as string;

    // check if message exists
    if (messageContent.length == 0) return;

    // create message in db
    const message: Message = await prisma.message.create({
      data: {
        content: messageContent,
        senderId: userId,
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    // trigger pusher API
    await pusherServer.trigger(
      `conversation-${conversationId}`,
      "new-message",
      message
    );
  } catch (error) {
    throw new Error("Failed to send message");
  }
}

export async function markMessagesAsReadAction(
  conversationId: string
): Promise<void> {
  try {
    const userId: string = await getUserIdAction();

    await prisma.message.updateMany({
      where: {
        conversationId,
        senderId: {
          not: userId,
        },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to mark messages as read");
  }
}
