import { JSX } from "react";
import UploadPhotoOption from "./UploadPhotoOption";
import PhotosList from "./PhotosList";

function PhotoGallery(): JSX.Element {
    return (
        <section className='user-images col-span-9 border border-[#E5C6AC] rounded-lg p-5'>
            
            <UploadPhotoOption />

            <PhotosList />
            
        </section>
    )
}

export default PhotoGallery