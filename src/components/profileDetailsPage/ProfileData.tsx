import { JSX } from "react";
import { currentUser, User } from "@clerk/nextjs/server";
import ProfileImage from "./ProfileImage";
import SetProfileData from "./SetProfileData";
import NoDataMessage from "../NoDataMessage";

async function ProfileData(): Promise<JSX.Element> {
    const user: User | null = await currentUser();

    return (
        <section className='profile-details sm:col-span-5 md:col-span-4 lg:col-span-3 border border-[#E5C6AC] rounded-lg p-5'>
            {!user ? (
                <NoDataMessage message="There was an error fetching account data" />
            ) : (
                <>
                    <ProfileImage user={user} />

                    <SetProfileData />
                </>
            )}
        </section>
    )
}

export default ProfileData