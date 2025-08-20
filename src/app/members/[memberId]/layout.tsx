import { JSX } from 'react';
import { Member, Photo } from '@prisma/client';
import { getSelectedMemberDataAction } from '@/actions/memberActions';
import NoDataMessage from '@/components/NoDataMessage';
import MemberProfileDetails from '@/components/selectedMemberPage/MemberProfileDetails';
import { checkIfMemberIsLikedAction } from '@/actions/likeActions';
import { SelectedMemberProvider } from '@/context/selectedMemberProvide';

async function layout({ params, children }: { params: Promise<{ memberId: string }>, children: React.ReactNode }): Promise<JSX.Element> {
    const { memberId } = await params;

    const memberData: (Member & { photoGallery: Photo[] }) | null = await getSelectedMemberDataAction(memberId);
    const isLiked = await checkIfMemberIsLikedAction(memberId);

    return (
        <div className='selected-member-page max-w-7xl mx-auto my-10 grid sm:grid-cols-12 gap-5 h-[80vh]'>
            {!memberData ? (
                <NoDataMessage message="No profile data available" />
            ) : (
                <SelectedMemberProvider memberData={memberData} isLiked={isLiked}>

                    <MemberProfileDetails memberData={memberData} />

                    {children}

                </SelectedMemberProvider>
            )}
        </div>
    )
}

export default layout