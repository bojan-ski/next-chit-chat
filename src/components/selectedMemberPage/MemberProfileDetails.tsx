import { JSX } from 'react';
import { Member } from '@prisma/client';
import UserProfileImage from '@/components/UserProfileImage';
import PageNavLink from './PageNavLink';

function MemberProfileDetails({ memberData }: { memberData: Member }): JSX.Element {
    return (
        <section className="member-profile-details max-h-[900px] md:col-span-5 lg:col-span-4 xl:col-span-3 border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]">

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
                <p className="text-2xl font-bold text-[#7B4B3A] mb-2">
                    {memberData.username}
                </p>
                <p className="text-sm text-[#A67C65] mb-4">
                    {memberData.city}, {memberData.state}
                </p>
                <p className="text-base text-[#5C4033] leading-relaxed">
                    {memberData.description}
                </p>
            </div>

            {/* chit chat btn */}
            <PageNavLink memberId={memberData.id} />
        </section>
    )
}

export default MemberProfileDetails