import { JSX } from "react";
import Link from "next/link";
import { NavigationLink } from "@/utils/types";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

type DesktopLinksProps = {
    memberNavigationLinks: NavigationLink[];
    pathname: string
}

function DesktopLinks({ memberNavigationLinks, pathname }: DesktopLinksProps): JSX.Element {
    return (
        <NavigationMenu className="hidden md:flex space-x-8">
            <NavigationMenuList>
                {memberNavigationLinks.map(({ href, label }) => (
                    <NavigationMenuItem key={href} >
                        <NavigationMenuLink asChild className="text-lg">
                            <Link
                                href={href}
                                className={`font-medium transition capitalize ${pathname == href ? 'text-[#C05C41] hover:text-[#7B4B3A]' : 'text-[#7B4B3A] hover:text-[#C05C41]'}`}
                            >
                                {label}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default DesktopLinks