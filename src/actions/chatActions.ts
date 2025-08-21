"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher";
import { Conversation, ForbiddenWord, Message } from "@prisma/client";
import {
  ConversationAndMessages,
  ConversationAndParticipants,
  FormStatus,
} from "@/types/types";
import { getUserIdAction, isAdminAction } from "./authActions";
import { newMessageSchema } from "@/utils/schemas";
import { fetchForbiddenWordsAction } from "./forbiddenWordAction";

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

async function containsForbiddenWordAction(
  message: string
): Promise<{ hasForbidden: boolean; words: string[] }> {
  const forbiddenWords: ForbiddenWord[] = await fetchForbiddenWordsAction();
  const lowerCaseMessage: string = message.toLowerCase();

  const words: string[] = forbiddenWords
    .map((fw) => fw.word.toLowerCase())
    .filter((word) => lowerCaseMessage.includes(word));

  return {
    hasForbidden: words.length > 0,
    words,
  };
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

    // check if message contains any forbidden words
    const messageCheck = await containsForbiddenWordAction(
      validatedData.data.message
    );

    if (messageCheck.hasForbidden) {
      return {
        status: "error",
        message: `Forbidden words: ${messageCheck.words}`,
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

export async function deleteMessageAction(
  messageId: string,
  conversationId: string
): Promise<void> {
  try {
    // get user id
    const userId: string = await getUserIdAction();

    // check if admin
    const isAdmin: boolean = await isAdminAction();

    // find message and check if user is message owner
    const message: Message | null = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!message) throw new Error("Message not found");
    if (message.senderId !== userId && !isAdmin) throw new Error("Unauthorized");

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

    // if admin revalidate page
    if (isAdmin) revalidatePath(`/all-conversations/${conversationId}`);
  } catch (error) {
    throw new Error("Failed to delete message");
  }
}

export async function fetchAllConversationsAction(): Promise<
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

export async function fetchMessagesBasedOnConversationIdAction(
  conversationId: string
) {
  const isAdmin: boolean = await isAdminAction();
  if (!isAdmin) throw new Error("Unauthorized");

  return await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: true,
    },
  });
}
