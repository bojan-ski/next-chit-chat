import { JSX } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

type ConversationCardProps = {
  otherUserId: string;
  otherUserName: string;
  numOfUnreadMessages: number;
};

function ConversationCard({
  otherUserId,
  otherUserName,
  numOfUnreadMessages,
}: ConversationCardProps): JSX.Element {
  return (
    <Link href={`/members/${otherUserId}/chat`}>
      <div
        className="flex items-center justify-between border border-gray-200 bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        {/* left - username */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white font-bold text-lg">
            {otherUserName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {otherUserName}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-gray-400" />
              Chat available
            </p>
          </div>
        </div>

        {/* right - unread messages */}
        {numOfUnreadMessages > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {numOfUnreadMessages}
          </div>
        )}
      </div>
    </Link>
  );
}

export default ConversationCard;
