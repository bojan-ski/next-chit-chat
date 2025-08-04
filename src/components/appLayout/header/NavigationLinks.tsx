import { JSX } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { memberLinks } from "@/utils/links";

function NavigationLinks(): JSX.Element {
    return (
        <nav className="hidden md:flex space-x-8">
            <NavigationMenu>
                <NavigationMenuList>
                    {memberLinks.map(({ href, label }) => (
                        <NavigationMenuItem key={href} >
                            <NavigationMenuLink asChild className="text-lg">
                                <Link
                                    href={href}
                                    className="text-[#7B4B3A] dark:text-[#E8D3C4] hover:text-[#C05C41] dark:hover:text-[#D9997A] font-medium transition capitalize"
                                >
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}

export default NavigationLinks