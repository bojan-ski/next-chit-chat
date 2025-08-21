"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { Conversation, Message } from "@prisma/client";
import {
  ConversationAndMessages,
  ConversationAndParticipants,
  FormStatus,
} from "@/types/types";
import { getUserIdAction, isAdminAction } from "./authActions";
import { newMessageSchema } from "@/utils/schemas";

export async function fetchCurrentUserConversationsAction(): Promise<
  (Conversation & { unreadCount: number })[]
> {
  const userId: string = await getUserIdAction();

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ participantOneId: userId }, { participantTwoId: userId }],
    },
    include: {
      participantOne: true,
      participantTwo: true,
      messages: {
        where: {
          isRead: false,
          NOT: { senderId: userId },
        },
        select: { id: true },
      },
    },
  });

  return conversations.map((conversation) => ({
    ...conversation,
    unreadCount: conversation.messages.length,
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
  prevState: FormStatus,
  formData: FormData
): Promise<FormStatus | void> {
  try {
    // get form data - message & validation
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = newMessageSchema.safeParse(rawData);

    if (validatedData.error) {
      return {
        status: "error",
        message: validatedData.error.issues[0]?.message || "Validation failed",
      };
    }

    // get user id
    const userId: string = await getUserIdAction();

    // create message in db
    const message: Message = await prisma.message.create({
      data: {
        content: validatedData.data.message,
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
    return {
      status: "error",
      message: "Failed to send message",
    };
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

export async function deleteMessageAction(messageId: string): Promise<void> {
  try {
    // get user id
    const userId: string = await getUserIdAction();

    // find message and check if user is message owner
    const message: Message | null = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!message) throw new Error("Message not found");
    if (message.senderId !== userId) throw new Error("Unauthorized");

    // delete from db
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    // trigger pusher API
    await pusherServer.trigger(
      `conversation-${message.conversationId}`,
      "delete-message",
      { messageId }
    );
  } catch (error) {
    throw new Error("Failed to delete message");
  }
}

export async function fetchAllConversations(): Promise<
  ConversationAndParticipants[]
> {
  const isAdmin: boolean = await isAdminAction();
  if (!isAdmin) throw new Error("Unauthorized");

  return await prisma.conversation.findMany({
    include: {
      participantOne: true,
      participantTwo: true,
    },
  });
}
