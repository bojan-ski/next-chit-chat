import { JSX } from 'react';
import { sendMessageAction } from '@/actions/chatActions';
import { FormStatus } from '@/types/types';
import FormWrapper from '../FormWrapper';
import { Input } from '../ui/input';

function SendMessageForm({ conversationId }: { conversationId: string }): JSX.Element {
    const sendMessage: (prevState: FormStatus, formData: FormData) => Promise<FormStatus | void> = sendMessageAction.bind(null, conversationId);

    return (
        <div className="p-4 border-t border-[#E5C6AC]">
            <FormWrapper
                action={sendMessage}
                buttonLabel="Send"
                pendingLabel="Sending..."
                formCss="space-y-3 sm:flex sm:items-center sm:justify-center sm:space-x-3 sm:space-y-0"
            >
                <Input
                    id='message'
                    name='message'
                    placeholder="Type a message..."
                    className="border-[#E5C6AC] focus:ring-[#C05C41] focus:border-[#C05C41]"
                    maxLength={200}
                    required
                />
            </FormWrapper>
        </div>
    )
}

export default SendMessageForm