'use client'

import { JSX } from "react";
import { usePathname } from "next/navigation";
import { useIsBanned } from "@/context/isBannedProvider";
import { memberNavigationLinks } from "@/utils/links";
import { adminNavigationLinks } from "@/utils/links";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileNavLinks from "./MobileNavLinks";

function NavigationLinks({ isAdmin }: { isAdmin: boolean }): JSX.Element {
    const pathname = usePathname();
    const navigationLinks = isAdmin ? adminNavigationLinks : memberNavigationLinks;

    const { unreadMessages } = useIsBanned();

    return (
        <>
            {/* desktop navigation links */}
            <DesktopNavLinks
                navigationLinks={navigationLinks}
                pathname={pathname}
                unreadMessages={unreadMessages}
            />

            {/* mobile navigation links */}
            <MobileNavLinks
                navigationLinks={navigationLinks}
                pathname={pathname}
                unreadMessages={unreadMessages}
            />
        </>

    )
}

export default NavigationLinks