import { JSX } from 'react';
import { fetchMessagesBasedOnConversationIdAction } from '@/actions/chatActions';
import MessageCard from '@/components/MessageCard';

async function ConversationPage({ params }: { params: Promise<{ conversationId: string }> }): Promise<JSX.Element> {
    const { conversationId } = await params;

    const conversation = await fetchMessagesBasedOnConversationIdAction(conversationId);

    // get conversation participants
    const senderIds = conversation.map(item => item.senderId);
    const uniqueSenderIds = [...new Set(senderIds)];

    return (
        <div className='selected-conversation-page max-w-7xl mx-auto my-10 border border-[#E5C6AC] rounded-lg p-5 h-[73vh] overflow-scroll'>
            <div className="space-y-4">
                {conversation.map((message) => {
                    const participantOne = message.senderId === uniqueSenderIds[0];

                    return (
                        <MessageCard
                            key={message.id}
                            messageId={message.id}
                            conversationId={message.conversationId}
                            isMessageOwner={participantOne}
                            messageContent={message.content}
                            messageCreated={message.createdAt}
                            allowMessageDelete={true}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default ConversationPage