import { JSX } from 'react';
import ProfileData from '@/components/profileDetailsPage/ProfileData';

function ProfileDetailsPage(): JSX.Element {
    return (
        <div className='profile-setup-page max-w-7xl mx-auto my-10 grid grid-cols-12 gap-5 h-[80vh]'>
            <ProfileData/>

            <section className='user-images border'>
                user-images
            </section>
        </div>
    )
}

export default ProfileDetailsPage