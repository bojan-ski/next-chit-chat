import { JSX } from 'react';
import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = (): JSX.Element => {
    return <div className='profile-page flex justify-center my-10'>
        <UserProfile />
    </div>

}

export default UserProfilePage