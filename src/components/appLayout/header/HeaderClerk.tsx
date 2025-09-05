'use client';

import { SignedIn, SignedOut } from "@clerk/nextjs";
import NavigationLinks from "./NavigationLinks";
import UserIcon from "./UserIcon";
import SignOutOption from "./SignOutOption";
import AuthOptions from "./AuthOptions";

function HeaderClerk({ isAdmin }: { isAdmin: boolean }) {
    return (
        <>
            <SignedIn>
                {/* navigation links */}
                <NavigationLinks isAdmin={isAdmin} />

                <div className="flex space-x-5 items-center">
                    {/* user icon - clerk profile page */}
                    <UserIcon />

                    {/* sign out option */}
                    <SignOutOption />
                </div>
            </SignedIn>

            <SignedOut>
                {/* auth options */}
                <AuthOptions />
            </SignedOut>
        </>
    )
}

export default HeaderClerk