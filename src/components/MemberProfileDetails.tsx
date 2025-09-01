import { JSX } from 'react';
import { Member } from '@prisma/client';
import UserProfileImage from '@/components/UserProfileImage';
import PageNavLink from './selectedMemberPage/PageNavLink';

type MemberProfileDetailsProps = {
    memberData: Member;
    sectionCss: string;
    allowPageNavLink: boolean
}

function MemberProfileDetails({ memberData, sectionCss, allowPageNavLink }: MemberProfileDetailsProps): JSX.Element {
    return (
        <section className={sectionCss}>

            {/* profile image */}
            <div className="mb-5 flex justify-center">
                <UserProfileImage
                    profileImage={memberData.profileImage}
                    imgCss="border-2 border-[#E5C6AC] w-50 h-50 rounded-full object-cover shadow-md"
                    iconCss="border-2 border-[#E5C6AC] w-50 h-50 rounded-full text-[#7B4B3A] shadow-md"
                />
            </div>

            {/* member info */}
            <div className="mb-5 text-center">
                <p className="text-2xl font-bold text-[#7B4B3A] mb-1">
                    {memberData.username}
                </p>
                <p className="text-[#A67C65] mb-3">
                    {memberData.city}, {memberData.state}
                </p>
                <p className="text-sm text-[#5C4033] leading-relaxed">
                    {memberData.description}
                </p>
            </div>

            {/* chit chat btn */}
            {allowPageNavLink && <PageNavLink memberId={memberData.id} />}            
        </section>
    )
}

export default MemberProfileDetails