import { JSX } from 'react';
import { deleteMessageAction } from '@/actions/chatActions';
import { FormStatus } from '@/types/types';
import { FaTrashAlt } from 'react-icons/fa';
import WithConfirmOption from './WithConfirmOption';

type DeleteMessageOptionProps = {
    messageId: string;
    conversationId: string
    isMessageOwner: boolean;
}

function DeleteMessageOption({ messageId, conversationId, isMessageOwner }: DeleteMessageOptionProps): JSX.Element {
    const deleteMessage: () => Promise<FormStatus> = deleteMessageAction.bind(null, messageId, conversationId);

    return (
        <div className={`flex items-center ${!isMessageOwner ? 'justify-start' : 'justify-end'}`}>
            <WithConfirmOption
                action={deleteMessage}
                buttonCss='text-red-300 hover:text-red-400 transition cursor-pointer'
            >
                <FaTrashAlt size={18} />
            </WithConfirmOption>
        </div>
    );
}

export default DeleteMessageOption