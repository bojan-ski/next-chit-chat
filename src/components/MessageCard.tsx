import { JSX } from 'react';
import { formatTime } from '@/utils/utils';
import DeleteMessageOption from './chatPage/DeleteMessageOption';

type MessageCardProps = {
    messageId: string;
    isMessageOwner: boolean,
    messageContent: string,
    messageCreated: Date
}

function MessageCard({ messageId, isMessageOwner, messageContent, messageCreated }: MessageCardProps): JSX.Element {
    return (
        <div
            className={`flex ${isMessageOwner ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[70%] rounded-lg px-3 py-2 ${isMessageOwner
                    ? 'bg-[#C05C41] text-white'
                    : 'bg-[#FFF9F5] border border-[#E5C6AC] text-[#7B4B3A]'
                    }`}
            >
                <p className="text-sm">
                    {messageContent}
                </p>
                <p className={`text-xs mb-3 mt-1 ${isMessageOwner ? 'text-red-100' : 'text-[#A67C65]'
                    }`}>
                    {formatTime(messageCreated)}
                </p>

                {/* delete message */}
                {isMessageOwner && <DeleteMessageOption messageId={messageId} />}
            </div>
        </div>
    )
}

export default MessageCard