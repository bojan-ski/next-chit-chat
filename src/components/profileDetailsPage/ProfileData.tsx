import { JSX } from "react";
import { currentUser, User } from "@clerk/nextjs/server";
import ProfileImage from "./ProfileImage";
import SetProfileData from "./SetProfileData";
import NoDataMessage from "../NoDataMessage";

async function ProfileData(): Promise<JSX.Element> {
    const user: User | null = await currentUser();

    return (
        <section className='profile-details col-span-3 border p-5'>
            {!user ? (
                <NoDataMessage message="There was an error fetching account data" />
            ) : (
                <>
                    <ProfileImage user={user} />

                    <SetProfileData userId={user?.id} />
                </>
            )}
        </section>
    )
}

export default ProfileData