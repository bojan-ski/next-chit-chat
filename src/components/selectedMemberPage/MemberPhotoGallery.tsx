import { JSX } from 'react';
import { Photo } from '@prisma/client';
import PhotoModal from '@/components/PhotoModal';

function MemberPhotoGallery({ photoGallery }: { photoGallery: Photo[] }): JSX.Element {
    return (
        <section className='member-photo-gallery sm:col-span-7 md:col-span-8 lg:col-span-9 border border-[#E5C6AC] rounded-lg p-5 bg-gradient-to-b from-[#FFF9F5] to-[#FCEFE8]'>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {photoGallery?.map((photo) => <PhotoModal key={photo.id} photo={photo} />)}
            </div>
        </section>
    )
}

export default MemberPhotoGallery