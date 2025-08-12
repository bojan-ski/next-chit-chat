import { JSX } from 'react';
import { uploadPhotoAction } from '@/actions/photoActions';
import FormWrapper from '../FormWrapper';
import FormImageInput from '../FormImageInput';

function UploadPhotoOption(): JSX.Element {
    return (
        <div className='border-b border-[#E5C6AC] mb-5 pb-3'>
            <FormWrapper
                action={uploadPhotoAction}
                encType="multipart/form-data"
                formCss='flex space-x-2'
                buttonLabel='Add Photo'
                pendingLabel='Adding...'
            >
                <FormImageInput
                    name="image"
                    additionInputClasses="w-50 cursor-pointer"
                />
            </FormWrapper>
        </div>
    )
}

export default UploadPhotoOption