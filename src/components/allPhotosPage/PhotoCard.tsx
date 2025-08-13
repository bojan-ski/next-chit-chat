import { JSX } from 'react';
import { Photo } from '@prisma/client';
import { approvePhotoAction, deletePhotoAction } from '@/actions/photoActions';
import PhotoModal from '../PhotoModal';
import ChangePhotoStatusOption from './ChangePhotoStatusOption';

function PhotoCard({ photo }: { photo: Photo }): JSX.Element {
    const approvePhoto = approvePhotoAction.bind(null, photo.id);
    const rejectPhoto = deletePhotoAction.bind(null, photo);

    return (
        <div className='flex flex-col space-y-2'>
            {/* Photo content */}
            <PhotoModal photo={photo} />

            {/* Photo change status */}
            <div className='grid grid-cols-2'>
                {/* approve photo */}
                <ChangePhotoStatusOption
                    action={approvePhoto}
                    buttonCss={'w-full border border-[#07eb44] bg-green-100 hover:bg-green-600 hover:text-white transition py-2 text-sm font-semibold rounded-l-md capitalize cursor-pointer'}
                    buttonLabel='Approve'
                />

                {/* deny photo */}
                <ChangePhotoStatusOption
                    action={rejectPhoto}
                    buttonCss={'w-full border border-[#eb0707] bg-red-100 hover:bg-red-700 hover:text-white transition py-2 text-sm font-semibold rounded-r-md capitalize cursor-pointer'}
                    buttonLabel='Reject'
                />
            </div>
        </div>
    )
}

export default PhotoCard