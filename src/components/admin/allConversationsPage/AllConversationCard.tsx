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
                className="rounded-2xl border border-[#E5C6AC] bg-white p-4 shadow-sm hover:shadow-lg hover:border-[#C05C41] transition-all duration-200"
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