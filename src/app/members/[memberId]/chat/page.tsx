import { JSX } from 'react';
import { getUserClerkIdAction } from '@/actions/authActions';
import { createOrGetConversationAction } from '@/actions/chatActions';
import { ConversationAndMessages } from '@/types/types';
import ChitChatWindow from '@/components/chitchatPage/ChitChatWindow';

async function ChatPage({ params }: { params: Promise<{ memberId: string }> }): Promise<JSX.Element> {
  const { memberId } = await params;

  const userId: string = await getUserClerkIdAction();
  const conversation: ConversationAndMessages = await createOrGetConversationAction(memberId);

  return (
    <ChitChatWindow
      conversation={conversation}
      userId={userId}
    />
  )
}

export default ChatPage