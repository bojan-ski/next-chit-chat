import { JSX } from 'react';
import Link from 'next/link';
import ConversationParticipant from './ConversationParticipant';

type AllConversationCardProps = {
    conversationId: string;
    participantOneUsername: string;
    participantTwoUsername: string;
}

function AllConversationCard({ conversationId, participantOneUsername, participantTwoUsername }: AllConversationCardProps): JSX.Element {
    return (
        <Link href={`/all-conversations/${conversationId}`}>
            <div
                className="border border-gray-200 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
                {/* participant one */}
                <ConversationParticipant username={participantOneUsername} />

                {/* participant two */}
                <ConversationParticipant username={participantTwoUsername} reverse />
            </div>
        </Link>
    )
}

export default AllConversationCard