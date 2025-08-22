import { JSX } from 'react';
import { Photo } from '@prisma/client';
import { deletePhotoAction } from '@/actions/photoActions';
import { FaTrashAlt } from 'react-icons/fa';
import FormSubmitButton from '../FormSubmitButton';

function DeletePhotoOption({ photo }: { photo: Photo }): JSX.Element {
    const deletePhoto = deletePhotoAction.bind(null, photo);

    return (
        <form action={deletePhoto}>
            <FormSubmitButton
                buttonCss='text-red-500 hover:text-red-700 transition cursor-pointer'
            >
                <FaTrashAlt size={18} />
            </FormSubmitButton>
        </form>
    )
}

export default DeletePhotoOption