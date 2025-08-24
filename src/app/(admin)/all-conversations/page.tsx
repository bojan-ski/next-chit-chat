import React, { JSX } from 'react';
import { fetchAllConversationsAction } from '@/actions/chatActions';
import { ConversationAndParticipants } from '@/types/types';
import NoDataMessage from '@/components/NoDataMessage';
import AllConversationCard from '@/components/admin/allConversationsPage/AllConversationCard';

async function AllConversationsPage(): Promise<JSX.Element> {
    const allConversations: ConversationAndParticipants[] = await fetchAllConversationsAction();

    return (
        <div className='all-conversations-page max-w-7xl mx-auto my-10'>
            {allConversations.length == 0 ? (
                <NoDataMessage message="There are no conversations" />
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {allConversations.map(conversation => {
                        return <AllConversationCard
                            key={conversation.id}
                            conversationId={conversation.id}
                            participantOneUsername={conversation.participantOne.username}
                            participantTwoUsername={conversation.participantTwo.username}
                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default AllConversationsPage