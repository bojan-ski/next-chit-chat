'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import { PageNavigationLink } from '@/types/types';
import PageNavLink from './PageNavLink';

function PageNavOptions({ pageLinks }: { pageLinks: PageNavigationLink[] }): JSX.Element {
    const pathname: string = usePathname();

    return (
        <section className='mb-5 pb-5 border-b border-[#E5C6AC] space-x-3'>
            {pageLinks.map(pageLink => {
                return <PageNavLink
                    key={pageLink.link}
                    link={pageLink.link}
                    label={pageLink.label}
                    pathname={pathname}
                />
            })}
        </section>
    )
}

export default PageNavOptions