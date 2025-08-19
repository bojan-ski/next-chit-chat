import { JSX } from 'react';
import { sendMessageAction } from '@/actions/chatActions';
import { Input } from '../ui/input';
import FormSubmitButton from '../FormSubmitButton';

function SendMessageForm({ conversationId }: { conversationId: string }): JSX.Element {
    const sendMessage = sendMessageAction.bind(null, conversationId);

    return (
        <div className=" p-4 border-t border-[#E5C6AC]">
            <form action={sendMessage} className="flex items-center justify-center space-x-3">
                <Input
                    id='message'
                    name='message'
                    placeholder="Type a message..."
                    className="border-[#E5C6AC] focus:ring-[#C05C41] focus:border-[#C05C41]"
                    required
                />
                <FormSubmitButton
                    buttonCss={'text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white transition py-1.5 px-3 rounded-md capitalize cursor-pointer'}
                >
                    Send
                </FormSubmitButton>
            </form>
        </div>
    )
}

export default SendMessageForm