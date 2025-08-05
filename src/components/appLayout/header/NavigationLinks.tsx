'use client'

import { JSX } from "react";
import { usePathname } from "next/navigation";
import { memberNavigationLinks } from "@/utils/links";
import { adminNavigationLinks } from "@/utils/links";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileNavLinks from "./MobileNavLinks";

function NavigationLinks({ isAdmin }: { isAdmin: boolean }): JSX.Element {
    const pathname = usePathname();
    const navigationLinks = isAdmin ? adminNavigationLinks : memberNavigationLinks;

    return (
        <>
            {/* desktop navigation links */}
            <DesktopNavLinks navigationLinks={navigationLinks} pathname={pathname} />

            {/* mobile navigation links */}
            <MobileNavLinks navigationLinks={navigationLinks} pathname={pathname} />
        </>

    )
}

export default NavigationLinks