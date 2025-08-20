import { JSX } from 'react';
import { getUserIdAction } from '@/actions/authActions';
import { createOrGetConversationAction } from '@/actions/chatActions';
import { ConversationAndMessages } from '@/types/types';
import ChatWindow from '@/components/chatPage/ChatWindow';

async function ChatPage({ params }: { params: Promise<{ memberId: string }> }): Promise<JSX.Element> {
  const { memberId } = await params;
  const userId: string = await getUserIdAction();
  const conversation: ConversationAndMessages = await createOrGetConversationAction(memberId);

  return (
    <ChatWindow
      conversation={conversation}
      userId={userId}
    />
  )
}

export default ChatPage