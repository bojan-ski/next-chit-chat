import { JSX } from 'react';
import { uploadImage } from '@/actions/imageActions';
import FormWrapper from '../FormWrapper';
import FormImageInput from '../FormImageInput';

function UploadImageOption(): JSX.Element {
    return (
        <div className='border-b border-[#E5C6AC] mb-5 pb-3'>
            <FormWrapper
                action={uploadImage}
                encType="multipart/form-data"
                formCss='flex space-x-2'
                buttonLabel='Add Image'
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

export default UploadImageOption