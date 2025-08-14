import { JSX } from "react";
import UploadPhotoOption from "./UploadPhotoOption";
import PhotosList from "./PhotosList";

function PhotoGallery(): JSX.Element {
    return (
        <section className='user-photo-galley sm:col-span-7 md:col-span-8 lg:col-span-9 border border-[#E5C6AC] rounded-lg p-5'>
            
            <UploadPhotoOption />

            <PhotosList />
            
        </section>
    )
}

export default PhotoGallery