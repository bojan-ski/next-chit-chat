import { JSX } from 'react';
import { getSelectedMemberDataAction } from '@/actions/memberActions';
import { checkIfMemberIsLikedAction } from '@/actions/likeActions';
import { Member, Photo } from '@prisma/client';
import NoDataMessage from '@/components/NoDataMessage';
import MemberPhotoGallery from '@/components/selectedMemberPage/MemberPhotoGallery';
import MemberProfileDetails from '@/components/selectedMemberPage/MemberProfileDetails';

async function SelectedMemberPage({ params }: { params: Promise<{ memberId: string }> }): Promise<JSX.Element> {
  const { memberId } = await params;

  const memberData: (Member & { photoGallery: Photo[] }) | null = await getSelectedMemberDataAction(memberId);
  const isLiked = await checkIfMemberIsLikedAction(memberId);

  return (
    <div className='selected-member-page max-w-7xl mx-auto my-10 grid sm:grid-cols-12 gap-5 h-[80vh]'>
      {!memberData ? (
        <NoDataMessage message="No profile data available" />
      ) : (
        <>
          <MemberProfileDetails memberData={memberData} />

          <MemberPhotoGallery memberId={memberId} isLiked={isLiked} photoGallery={memberData.photoGallery} />
        </>
      )}
    </div>
  )
}

export default SelectedMemberPage