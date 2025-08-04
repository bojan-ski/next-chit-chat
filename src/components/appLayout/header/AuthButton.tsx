import { JSX } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
    href: string;
    label: string
}

function AuthButton({ href, label }: Props): JSX.Element {
    return (
        <Link href={href}>
            <Button
                variant="outline"
                className="text-[#7B4B3A] dark:text-[#E8D3C4] border-[#E5C6AC] dark:border-[#7C5C53] hover:bg-[#C05C41] hover:text-white dark:hover:bg-[#D9997A] capitalize cursor-pointer"
            >
                {label}
            </Button>
        </Link>
    )
}

export default AuthButton