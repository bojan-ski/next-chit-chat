import { JSX } from 'react';
import { User } from '@clerk/nextjs/server';
import UserProfileImage from '../UserProfileImage';

async function ProfileImage({ user }: { user: User | null }): Promise<JSX.Element> {
    const profileImage: string | undefined = user?.imageUrl;
    const userEmailAddress: string | undefined = user?.emailAddresses[0].emailAddress;

    return (
        <div className="mb-5">
            <UserProfileImage
                profileImage={profileImage}
                imgCss='border border-[#E5C6AC] w-50 h-50 rounded-full object-cover mx-auto mb-3'
                iconCss='border border-[#E5C6AC] w-50 h-50 rounded-full text-[#7B4B3A] mx-auto mb-3'
            />

            <p className="font-semibold text-center">
                <span className="mr-1">
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