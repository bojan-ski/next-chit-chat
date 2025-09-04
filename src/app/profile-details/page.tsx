import { JSX } from 'react';
import { currentUser, User } from "@clerk/nextjs/server";
import ProfileData from '@/components/profileDetailsPage/ProfileData';
import NoDataMessage from '@/components/NoDataMessage';
import PhotoGallery from '@/components/profileDetailsPage/PhotoGallery';

async function ProfileDetailsPage(): Promise<JSX.Element> {
    const user: User | null = await currentUser();

    if (!user) {
        return (
            <NoDataMessage
                message="Error fetching account data"
                headerCss='mt-10'
            />
        )
    }

    return (
        <div className='profile-setup-page max-w-7xl mx-auto my-10 grid md:grid-cols-12 gap-5'>

            <ProfileData user={user} />

            <PhotoGallery />

        </div>
    )
}

export default ProfileDetailsPage