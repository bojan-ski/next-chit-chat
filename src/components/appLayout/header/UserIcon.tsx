import { JSX } from 'react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { LuUser } from 'react-icons/lu';

async function UserIcon(): Promise<JSX.Element> {
    const user = await currentUser();
    const profileImage = user?.imageUrl;

    return (
        <Link href={'/user-profile'}>
            {profileImage ? (
                <img src={profileImage} className='w-8 h-8 rounded-md hover:shadow-lg transition object-cover' />
            ) : (
                <LuUser className='w-8 h-8 border text-[#7B4B3A] hover:bg-[#C05C41] hover:text-white border-[#E5C6AC] rounded-md transition bg-primary' />
            )}
        </Link>
    )
}

export default UserIcon