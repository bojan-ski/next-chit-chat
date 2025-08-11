import { JSX } from "react";
import { uploadImage } from "@/actions/imageActions";
import FormWrapper from "../FormWrapper";
import FormImageInput from "../FormImageInput";

function PhotoGallery(): JSX.Element {
    return (
        <section className='user-images col-span-9 border border-[#E5C6AC] rounded-lg p-5'>
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
        </section>
    )
}

export default PhotoGallery