import { JSX } from 'react';
import ProfileData from '@/components/profileDetailsPage/ProfileData';
import PhotoGallery from '@/components/profileDetailsPage/PhotoGallery';

function ProfileDetailsPage(): JSX.Element {
    return (
        <div className='profile-setup-page max-w-7xl mx-auto my-10 grid sm:grid-cols-12 gap-5 h-[80vh]'>

            <ProfileData />

            <PhotoGallery />

        </div>
    )
}

export default ProfileDetailsPage