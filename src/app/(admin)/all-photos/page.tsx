import { JSX } from 'react'
import { fetchAllPhotosAction } from '@/actions/photoActions';
import { Photo } from '@prisma/client';
import PhotoCard from '@/components/allPhotosPage/PhotoCard';

async function AllPhotosPage(): Promise<JSX.Element> {
  const approvedPhotos: Photo[] | null = await fetchAllPhotosAction(true);

  return (
    <section className='all-photos-page grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {approvedPhotos?.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
    </section>
  )
}

export default AllPhotosPage