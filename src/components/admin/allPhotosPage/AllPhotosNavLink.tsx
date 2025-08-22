import { JSX } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type AllPhotosNavLinkProps = {
    link: string;
    label: string;
    pathname: string;
}

function AllPhotosNavLink({ link, label, pathname }: AllPhotosNavLinkProps): JSX.Element {
    return (
        <Link href={link}>
            <Button
                variant="outline"
                className={`text-[#7B4B3A] border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white capitalize cursor-pointer ${pathname == link && 'bg-[#C05C41] text-white'}`}
            >
                {label}
            </Button>
        </Link>
    )
}

export default AllPhotosNavLink