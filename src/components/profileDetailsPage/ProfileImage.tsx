import { JSX } from 'react';
import { User } from '@clerk/nextjs/server';
import Image from "next/image";
import { LuUser } from 'react-icons/lu';

async function ProfileImage({ user }: { user: User | null }): Promise<JSX.Element> {
    const profileImage: string | undefined = user?.imageUrl;
    const userEmailAddress: string | undefined = user?.emailAddresses[0].emailAddress;

    return (
        <div className="mb-5">
            {profileImage ? (
                <img src={profileImage} className='border border-[#E5C6AC] w-50 h-50 rounded-full object-cover mx-auto mb-3' />
            ) : (
                <LuUser className='border border-[#E5C6AC] w-50 h-50 rounded-full text-[#7B4B3A] mx-auto mb-3' />
            )}

            {/* <Image
                    height={200}
                    width={200}
                    src={`${profileImage}`}
                    alt={'user_img'}
                    className="rounded-full mt-6 aspect-square object-cover"
                /> */}

            <p className="font-semibold text-center">
                <span className="mr-2">
                    Email address:
                </span>
                <span>
                    {userEmailAddress && (user?.emailAddresses[0].emailAddress)}
                </span>
            </p>
        </div>
    )
}

export default ProfileImage