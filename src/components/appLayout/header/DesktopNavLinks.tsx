import { JSX } from "react";
import Link from "next/link";
import { NavigationLink, NavigationLinks } from "@/types/types";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

function DesktopNavLinks({ navigationLinks, pathname, unreadMessages }: NavigationLinks): JSX.Element {
    return (
        <NavigationMenu className="hidden lg:flex space-x-8">
            <NavigationMenuList>
                {navigationLinks.map(({ href, label }: NavigationLink) => (
                    <NavigationMenuItem key={href} >
                        <NavigationMenuLink asChild className="text-lg">
                            <Link
                                href={href}
                                className={`font-semibold capitalize ${pathname == href ? 'text-[#C05C41] hover:text-[#7B4B3A]' : 'text-[#7B4B3A] hover:text-[#C05C41]'} ${(unreadMessages && label == 'conversation') && 'text-red-500'}`}
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

export default DesktopNavLinks