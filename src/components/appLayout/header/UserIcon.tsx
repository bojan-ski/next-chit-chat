import { JSX } from 'react';
import Link from 'next/link';
import UserProfileImage from '@/components/UserProfileImage';
import { useUser } from '@clerk/nextjs';

function UserIcon(): JSX.Element {
    const user = useUser();
    const profileImage = user?.user?.imageUrl ?? '';

    return (
        <Link href={'/user-profile'}>
            <UserProfileImage
                profileImage={profileImage}
                imgCss='w-8 h-8 rounded-md hover:shadow-lg transition object-cover'
                iconCss='w-8 h-8 border text-[#7B4B3A] hover:bg-[#C05C41] hover:text-white border-[#E5C6AC] rounded-md transition'
            />
        </Link>
    )
}

export default UserIcon