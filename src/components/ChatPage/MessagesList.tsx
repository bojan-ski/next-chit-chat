import { JSX, useEffect, useRef } from 'react';
import { Message } from '@prisma/client';
import { ScrollArea } from '../ui/scroll-area';
import { formatTime } from '@/utils/utils';

type MessagesListProps = {
    messages: Message[],
    userId: string
}

function MessagesList({ messages, userId }: MessagesListProps): JSX.Element {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ScrollArea className="p-4 h-[400px] sm:h-[650px]">
            <div className="space-y-4">
                {messages.map((message) => {
                    const isMessageOwner: boolean = message.senderId === userId;

                    return (
                        <div
                            key={message.id}
                            className={`flex ${isMessageOwner ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg px-3 py-2 ${isMessageOwner
                                    ? 'bg-[#C05C41] text-white'
                                    : 'bg-[#FFF9F5] border border-[#E5C6AC] text-[#7B4B3A]'
                                    }`}
                            >
                                <p className="text-sm">
                                    {message.content}
                                </p>
                                <p className={`text-xs mt-1 ${isMessageOwner ? 'text-red-100' : 'text-[#A67C65]'
                                    }`}>
                                    {formatTime(message.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    )
}

export default MessagesList