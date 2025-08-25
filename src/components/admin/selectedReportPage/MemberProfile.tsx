import { JSX } from 'react';
import { Member } from '@prisma/client';
import UserProfileImage from '@/components/UserProfileImage';

type MemberProfileProps = {
    member: Member
};

function MemberProfile({ member }: MemberProfileProps): JSX.Element {
    return (
        <div className="member-profile-details border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]">
            {/* profile image */}
            <section className="mb-5 flex justify-center">
                <UserProfileImage
                    profileImage={member.profileImage}
                    imgCss="border-2 border-[#E5C6AC] w-50 h-50 rounded-full object-cover shadow-md"
                    iconCss="border-2 border-[#E5C6AC] w-50 h-50 rounded-full text-[#7B4B3A] shadow-md"
                />
            </section>

            {/* member info */}
            <section className="mb-5 text-center">
                <p className="text-2xl font-bold text-[#7B4B3A] mb-2">
                    {member.username}
                </p>
                <p className="text-sm text-[#A67C65] mb-4">
                    {member.city}, {member.state}
                </p>
                <p className="text-base text-[#5C4033] leading-relaxed">
                    {member.description}
                </p>
            </section>
        </div>
    );
}

export default MemberProfile;
