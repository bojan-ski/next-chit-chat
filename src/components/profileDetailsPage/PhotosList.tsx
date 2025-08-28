import { JSX } from "react";
import { Photo } from '@prisma/client';
import { fetchCurrentUserPhotosAction } from "@/actions/photoActions";
import PhotoModal from "../PhotoModal";

async function PhotosList(): Promise<JSX.Element> {
    const photos: Photo[] = await fetchCurrentUserPhotosAction();

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos?.map((photo) => <PhotoModal key={photo.id} photo={photo} />)}
        </div>
    );
}

export default PhotosList;