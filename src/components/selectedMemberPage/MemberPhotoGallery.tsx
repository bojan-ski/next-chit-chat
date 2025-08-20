'use client';

import { JSX } from 'react';
import { useSelectedMember } from '@/context/selectedMemberProvide';
import PhotoModal from '@/components/PhotoModal';
import LikeMemberOption from './LikeMemberOption';

function MemberPhotoGallery(): JSX.Element {
    const { memberData, isLiked } = useSelectedMember();

    return (
        <section className='member-photo-gallery sm:col-span-7 md:col-span-8 lg:col-span-9 border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]'>
            {/* like/unlike member option */}
            <div className='mb-5 flex items-center justify-end'>
                <LikeMemberOption targetMemberId={memberData.id} isLiked={isLiked} />
            </div>

            {/* member photo galley */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {memberData.photoGallery?.map((photo) => <PhotoModal key={photo.id} photo={photo} />)}
            </div>
        </section>
    )
}

export default MemberPhotoGallery