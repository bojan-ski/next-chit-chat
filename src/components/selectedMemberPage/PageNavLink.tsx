'use client'

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

function PageNavLink({ memberId }: { memberId: string }): JSX.Element {
    const pathname: string = usePathname();
    const isChatPage: boolean = pathname.includes('/chat');

    return (
        <div className="flex justify-center">
            <Link href={isChatPage ? `/members/${memberId}` : `/members/${memberId}/chat`}>
                <Button
                    variant="outline"
                    className="px-6 py-2 text-[#7B4B3A] border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white hover:border-[#C05C41] capitalize transition-all duration-300 shadow-sm cursor-pointer"
                >
                    {isChatPage ? 'photo gallery' : 'chit chat'}
                </Button>
            </Link>
        </div>
    )
}

export default PageNavLink