import { JSX } from 'react';
import { LuUser } from 'react-icons/lu';

type UserProfileImageProps = {
    profileImage: string | undefined
    imgCss?: string
    iconCss?: string
}

function UserProfileImage({ profileImage, imgCss, iconCss }: UserProfileImageProps): JSX.Element {
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