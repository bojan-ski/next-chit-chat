import { JSX } from 'react';
import { deleteMessageAction } from '@/actions/chatActions';
import { FaTrashAlt } from 'react-icons/fa';
import WithConfirmOption from './WithConfirmOption';

type DeleteMessageOptionProps = {
    messageId: string;
    conversationId: string
    isMessageOwner: boolean;
}

function DeleteMessageOption({ messageId, conversationId, isMessageOwner }: DeleteMessageOptionProps): JSX.Element {
    const deleteMessage = deleteMessageAction.bind(null, messageId, conversationId);

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

// 'use client';

// import { JSX, useTransition } from 'react';
// import { deleteMessageAction } from '@/actions/chatActions';
// import { FaTrashAlt } from 'react-icons/fa';

// type DeleteMessageOptionProps = {
//     messageId: string;
//     conversationId: string
//     isMessageOwner: boolean;
// }

// function DeleteMessageOption({ messageId, conversationId, isMessageOwner }: DeleteMessageOptionProps): JSX.Element {
//     const [isPending, startTransition] = useTransition();

//     const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
//         e.preventDefault();

//         if (confirm('Are you sure you want to delete the message?')) {
//             startTransition(async () => {
//                 await deleteMessageAction(messageId, conversationId);
//             });
//         };
//     };

//     return (
//         <div className={`flex items-center ${!isMessageOwner ? 'justify-start' : 'justify-end'}`}>
//             <button
//                 onClick={handleDelete}
//                 disabled={isPending}
//                 className="text-red-300 hover:text-red-400 transition cursor-pointer"
//             >
//                 <FaTrashAlt size={18} />
//             </button>
//         </div>
//     );
// }

// export default DeleteMessageOption