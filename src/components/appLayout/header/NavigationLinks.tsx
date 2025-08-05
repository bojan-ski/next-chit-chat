'use client'

import { JSX } from "react";
import { usePathname } from "next/navigation";
import { memberNavigationLinks } from "@/utils/links";
import DesktopLinks from "./DesktopLinks";
import MobileLinks from "./MobileLinks";

function NavigationLinks(): JSX.Element {
    const pathname = usePathname();

    return (
        <>
            {/* desktop navigation links */}
            <DesktopLinks memberNavigationLinks={memberNavigationLinks} pathname={pathname}/>

            {/* mobile navigation links */}
            <MobileLinks memberNavigationLinks={memberNavigationLinks} pathname={pathname}/>
        </>

    )
}

export default NavigationLinks