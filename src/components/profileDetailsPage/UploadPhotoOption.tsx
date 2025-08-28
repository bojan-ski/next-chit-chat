import { JSX } from 'react';
import { uploadPhotoAction } from '@/actions/photoActions';
import FormWrapper from '../FormWrapper';
import FormImageInput from '../FormImageInput';
import ImageUploadTooltip from './ImageUploadTooltip';

function UploadPhotoOption(): JSX.Element {
    return (
        <div className='border-b border-[#E5C6AC] mb-5 pb-3 flex items-center justify-between'>
            {/* image upload option */}
            <FormWrapper
                action={uploadPhotoAction}
                // encType="multipart/form-data"
                formCss='flex space-x-2'
                buttonLabel='Add Photo'
                pendingLabel='Adding...'
            >
                <FormImageInput
                    name="image"
                    additionInputClasses="w-50 cursor-pointer"
                />
            </FormWrapper>

            {/* tooltip */}
            <ImageUploadTooltip/>
        </div>
    )
}

export default UploadPhotoOption