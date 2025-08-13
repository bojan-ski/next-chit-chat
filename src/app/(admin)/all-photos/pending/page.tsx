import { JSX } from 'react';
import { fetchAllPhotosAction } from '@/actions/photoActions';
import { Photo } from '@prisma/client';
import PhotoCard from '@/components/allPhotosPage/PhotoCard';

async function AllPendingPhotosPage(): Promise<JSX.Element> {
    const pendingApprovalPhotos: Photo[] | null = await fetchAllPhotosAction(false);

    return (
        <section className='all-pending-photos-page grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {pendingApprovalPhotos?.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
        </section>
    )
}

export default AllPendingPhotosPage