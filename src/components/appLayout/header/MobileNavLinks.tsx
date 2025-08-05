import { JSX } from "react";
import Link from "next/link";
import { NavigationLink } from "@/utils/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuAlignLeft } from "react-icons/lu";

type MobileLinksProps = {
    navigationLinks: NavigationLink[];
    pathname: string
}

function MobileNavLinks({ navigationLinks, pathname }: MobileLinksProps): JSX.Element {
    return (
        <div className="block md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="border-[#7B4B3A] text-[#7B4B3A] hover:bg-[#E5C6AC] px-3 py-2 cursor-pointer"
                    >
                        <LuAlignLeft className="w-6 h-6" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="bg-white border border-[#E5C6AC] shadow-xl mt-2 w-44"
                >
                    {navigationLinks.map(({ href, label }) => (
                        <DropdownMenuItem
                            key={href}
                            className="hover:bg-[#F6E7DA] focus:bg-[#F6E7DA] px-3 py-2 transition-colors"
                        >
                            <Link
                                href={href}
                                className={`block w-full font-medium transition capitalize ${pathname == href ? 'text-[#C05C41] hover:text-[#7B4B3A]' : 'text-[#7B4B3A] hover:text-[#C05C41]'}`}
                            >
                                {label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileNavLinks