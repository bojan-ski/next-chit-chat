import { JSX } from 'react';
import ProfileData from '@/components/profileDetailsPage/ProfileData';
import PhotoGallery from '@/components/profileDetailsPage/PhotoGallery';

function ProfileDetailsPage(): JSX.Element {
    return (
        <div className='profile-setup-page max-w-7xl mx-auto my-10 grid md:grid-cols-12 gap-5'>

            <ProfileData />

            <PhotoGallery />

        </div>
    )
}

export default ProfileDetailsPage