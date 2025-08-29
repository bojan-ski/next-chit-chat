import { JSX } from "react";
import { Conversation } from "@prisma/client";
import { getUserClerkIdAction } from "@/actions/authActions";
import { fetchCurrentUserConversationsAction } from "@/actions/chatActions";
import NoDataMessage from "@/components/NoDataMessage";
import ConversationCard from "@/components/conversationsPage/ConversationCard";

async function ConversationPage(): Promise<JSX.Element> {
  const userId: string = await getUserClerkIdAction();
  const conversations: Conversation[] = await fetchCurrentUserConversationsAction();

  return (
    <div className='members-page max-w-7xl mx-auto my-10'>
      {conversations.length == 0 ? (
        <NoDataMessage message="You have no conversations" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {conversations.map(conversation => {
            const otherUserId = conversation?.participantOneId == userId ? conversation?.participantTwoId : conversation?.participantOneId;
            const otherUserName = conversation?.participantOneId == userId ? conversation?.participantTwo.username : conversation?.participantOne.username;
            const numOfUnreadMessages = conversation.unreadCount;

            return <ConversationCard
              key={conversation?.id}
              otherUserId={otherUserId}
              otherUserName={otherUserName}
              numOfUnreadMessages={numOfUnreadMessages}
            />
          })}
        </div>
      )}
    </div>
  )
}

export default ConversationPage