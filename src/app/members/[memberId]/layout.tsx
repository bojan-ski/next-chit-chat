import { JSX } from 'react';
import { Member, Photo } from '@prisma/client';
import { SelectedMemberProvider } from '@/context/selectedMemberProvide';
import { getSelectedMemberDataAction } from '@/actions/memberActions';
import { checkIfMemberIsLikedAction } from '@/actions/likeActions';
import NoDataMessage from '@/components/NoDataMessage';
import MemberProfileDetails from '@/components/MemberProfileDetails';

async function layout({ params, children }: { params: Promise<{ memberId: string }>, children: React.ReactNode }): Promise<JSX.Element> {
    const { memberId } = await params;

    const memberData: (Member & { photoGallery: Photo[] }) | null = await getSelectedMemberDataAction(memberId);
    const isLiked = await checkIfMemberIsLikedAction(memberId);

    return (
        <div className='selected-member-page max-w-7xl mx-auto my-10 grid md:grid-cols-12 gap-5'>
            {!memberData ? (
                <NoDataMessage message="No profile data available" />
            ) : (
                <SelectedMemberProvider memberData={memberData} isLiked={isLiked}>

                    <MemberProfileDetails
                        memberData={memberData}
                        sectionCss='member-profile-details max-h-[900px] md:col-span-5 lg:col-span-4 xl:col-span-3 border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]'
                        allowChitChat={true}
                    />

                    {children}

                </SelectedMemberProvider>
            )}
        </div>
    )
}

export default layout