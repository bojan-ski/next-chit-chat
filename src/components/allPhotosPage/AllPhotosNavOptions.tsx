'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import AllPhotosNavLink from './AllPhotosNavLink';

function AllPhotosNavOptions(): JSX.Element {
    const pathname: string = usePathname();
    
    return (
        <section className='mb-5 space-x-3'>
            <AllPhotosNavLink
                link='/all-photos'
                label='All approved member photos'            
                pathname={pathname}
            />

            <AllPhotosNavLink
                link='/all-photos/pending'
                label='All pending member photos'            
                pathname={pathname}
            />
        </section>
    )
}

export default AllPhotosNavOptions