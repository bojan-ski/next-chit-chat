import { JSX } from 'react'
import { fetchAllPhotosAction } from '@/actions/photoActions';
import { Photo } from '@prisma/client';
import PhotoCard from '@/components/allPhotosPage/PhotoCard';

async function AllPhotosPage(): Promise<JSX.Element> {
  const pendingApprovalPhotos: Photo[] | null = await fetchAllPhotosAction(false);
  const approvedPhotos: Photo[] | null = await fetchAllPhotosAction(true);

  return (
    <div className='all-photos-page max-w-7xl mx-auto mt-10'>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pendingApprovalPhotos?.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
      </div>

    </div>
  )
}

export default AllPhotosPage