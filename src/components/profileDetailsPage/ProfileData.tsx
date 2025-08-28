import { JSX } from "react";
import { User } from "@clerk/nextjs/server";
import ClerkAccountData from "./ClerkAccountData";
import SetProfileData from "./SetProfileData";

async function ProfileData({ user }: { user: User }): Promise<JSX.Element> {
    return (
        <section className='profile-details max-h-[900px] md:col-span-5 lg:col-span-4 xl:col-span-3 border border-[#E5C6AC] rounded-lg p-5'>

            <ClerkAccountData user={user} />

            <SetProfileData />

        </section>
    )
}

export default ProfileData