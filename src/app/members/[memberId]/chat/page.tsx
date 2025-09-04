import { JSX } from 'react';
import { getUserClerkIdAction } from '@/actions/authActions';
import { createOrGetConversationAction } from '@/actions/chatActions';
import { ConversationAndMessages } from '@/types/types';

async function ChatPage({ params }: { params: Promise<{ memberId: string }> }): Promise<JSX.Element> {
  const { memberId } = await params;

  const userId: string = await getUserClerkIdAction();
  const conversation: ConversationAndMessages = await createOrGetConversationAction(memberId);

  return (
    <></>
  )
}

export default ChatPage