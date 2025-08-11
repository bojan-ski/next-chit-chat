import { JSX } from "react";
import UploadImageOption from "./UploadImageOption";
import ProfileImagesList from "./ProfileImagesList";

function PhotoGallery(): JSX.Element {
    return (
        <section className='user-images col-span-9 border border-[#E5C6AC] rounded-lg p-5'>
            
            <UploadImageOption />

            <ProfileImagesList />
            
        </section>
    )
}

export default PhotoGallery