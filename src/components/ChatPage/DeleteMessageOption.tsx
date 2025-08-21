import { JSX, useTransition } from 'react';
import { deleteMessageAction } from '@/actions/chatActions';
import { FaTrashAlt } from 'react-icons/fa';

function DeleteMessageOption({ messageId }: { messageId: string }): JSX.Element {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        startTransition(async () => {
            await deleteMessageAction(messageId);
        });
    };

    return (
        <div className='flex items-center justify-end'>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-red-300 hover:text-red-400 transition cursor-pointer flex"
            >
                <FaTrashAlt size={18} />
            </button>
        </div>
    );
}

export default DeleteMessageOption