import { JSX } from 'react';
import { Member } from '@prisma/client';
import Link from 'next/link';
import UserProfileImage from '@/components/UserProfileImage';
import { Button } from '@/components/ui/button';

function MemberProfileDetails({ memberData }: { memberData: Member }): JSX.Element {
    return (
        <section className="member-profile-details sm:col-span-5 md:col-span-4 lg:col-span-3 border border-[#E5C6AC] rounded-lg p-5 bg-gradient-to-b from-[#FFF9F5] to-[#FCEFE8]">

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
            <div className="flex justify-center">
                <Link href="#">
                    <Button
                        variant="outline"
                        className="px-6 py-2 text-[#7B4B3A] border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white hover:border-[#C05C41] capitalize transition-all duration-300 shadow-sm cursor-pointer"
                    >
                        Chit Chat
                    </Button>
                </Link>
            </div>
        </section>

    )
}

export default MemberProfileDetails