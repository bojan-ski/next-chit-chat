import { JSX, RefObject, useEffect, useRef } from 'react';
import { Message } from '@prisma/client';
import { ScrollArea } from '../ui/scroll-area';
import MessageCard from '../MessageCard';

type MessagesListProps = {
    messages: Message[],
    userId: string
}

function MessagesList({ messages, userId }: MessagesListProps): JSX.Element {
    const messagesEndRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('useEffect - MessagesList');

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
                        <MessageCard
                            key={message.id}
                            messageId={message.id}
                            conversationId={message.conversationId}
                            senderId={message.senderId}
                            isMessageOwner={isMessageOwner}
                            messageContent={message.content}
                            messageCreated={message.createdAt}
                            allowMessageDelete={isMessageOwner}
                        />
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    )
}

export default MessagesList