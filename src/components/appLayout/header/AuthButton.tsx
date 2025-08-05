import { JSX } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type AuthButtonProps = {
    href: string;
    label: string
}

function AuthButton({ href, label }: AuthButtonProps): JSX.Element {
    return (
        <Link href={href}>
            <Button
                variant="outline"
                className="text-[#7B4B3A] border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white capitalize cursor-pointer"
            >
                {label}
            </Button>
        </Link>
    )
}

export default AuthButton