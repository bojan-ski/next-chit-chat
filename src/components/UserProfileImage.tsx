import { JSX } from 'react';
import { LuUser } from 'react-icons/lu';

function UserProfileImage({ profileImage, imgCss, iconCss }: { profileImage: string | undefined, imgCss: string, iconCss: string }): JSX.Element {
    return (
        <>
            {profileImage ? (
                <img src={profileImage} className={imgCss} />
            ) : (
                <LuUser className={iconCss} />
            )}
        </>
    )
}

export default UserProfileImage