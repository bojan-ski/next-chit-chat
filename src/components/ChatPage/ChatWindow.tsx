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
        console.log('useEffect 1 - ChatWindow');

        // subscribe to the conversation channel
        const channel = pusherClient.subscribe(`conversation-${conversation?.id}`);

        // create message
        channel.bind('new-message', (message: Message) => {
            setMessages(prevState => [...prevState, message]);
        });

        // delete message
        channel.bind("delete-message", ({ messageId }: { messageId: string }) => {
            setMessages(prevState => prevState.filter(message => message.id !== messageId));
        });

        // mark messages as read when opening chat
        markMessagesAsReadAction(conversation?.id);

        // unsubscribe from the conversation channel
        return () => {
            pusherClient.unsubscribe(`conversation-${conversation?.id}`);
        };

    }, [conversation?.id]);

    // during conversation mark received messages as read
    useEffect(() => {
        console.log('useEffect 2 - ChatWindow');

        markMessagesAsReadAction(conversation?.id);
    }, [messages])

    return (
        <section className='chat-window md:col-span-7 lg:col-span-8 xl:col-span-9 border border-[#E5C6AC] rounded-lg p-5'>

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