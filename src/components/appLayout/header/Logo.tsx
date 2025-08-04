import { JSX } from "react";
import Link from "next/link";

function Logo(): JSX.Element {
    return (
        <Link
            href="/"
            className="text-3xl font-bold text-[#C05C41] dark:text-[#D9997A]"
        >
            Chit Chat
        </Link>
    )
}

export default Logo