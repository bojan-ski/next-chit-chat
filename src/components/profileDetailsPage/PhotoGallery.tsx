import { JSX } from "react";
import UploadPhotoOption from "./UploadPhotoOption";
import PhotosList from "./PhotosList";

function PhotoGallery(): JSX.Element {
    return (
        <section className='user-photo-galley md:col-span-7 lg:col-span-8 xl:col-span-9 border border-[#E5C6AC] rounded-lg p-5'>
            
            <UploadPhotoOption />

            <PhotosList />
            
        </section>
    )
}

export default PhotoGallery