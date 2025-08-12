import { JSX } from "react";
import { fetchPhotosByUserId } from "@/actions/photoActions";
import { Photo } from '@prisma/client';
import PhotosCard from "./PhotosCard";

async function PhotosList(): Promise<JSX.Element> {
    const photos: Photo[] | null = await fetchPhotosByUserId();

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos?.map((photo) => <PhotosCard key={photo.id} photo={photo} />)}
        </div>
    );
}

export default PhotosList;
