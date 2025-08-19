'use client';

import { JSX, useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { Message } from '@prisma/client';
import { ConversationAndMessages } from '@/types/types';
import { markMessagesAsReadAction } from '@/actions/chatActions';
import MessagesList from './MessagesList';
import SendMessageForm from './SendMessageForm';

type ChatWindowProps = {
    conversation: ConversationAndMessages,
    userId: string
}

function ChatWindow({ conversation, userId }: ChatWindowProps): JSX.Element {
    const [messages, setMessages] = useState<Message[]>(conversation?.messages);

    // on page load subscribe to pusher and mark all unread messages as read
    useEffect(() => {
        console.log('ChatWindow - useEffect 1');

        // subscribe to the conversation channel
        const channel = pusherClient.subscribe(`conversation-${conversation?.id}`);

        channel.bind('new-message', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        // mark messages as read when opening chat
        markMessagesAsReadAction(conversation?.id);

        return () => {
            pusherClient.unsubscribe(`conversation-${conversation?.id}`);
        };

    }, [conversation?.id]);

    // during conversation mark received messages as read
    useEffect(() => {
        console.log('ChatWindow - useEffect 2');

        markMessagesAsReadAction(conversation?.id);
    }, [messages])

    return (
        <section className='chat-window sm:col-span-7 md:col-span-8 lg:col-span-9 border border-[#E5C6AC] rounded-lg p-5'>

            {/* messages */}
            <MessagesList
                messages={messages}
                userId={userId}
            />

            {/* Message input */}
            <SendMessageForm conversationId={conversation.id} />
        </section>
    )
}

export default ChatWindow