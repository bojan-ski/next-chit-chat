'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import AdminPagesNavLink from '../AdminPagesNavLink';

function AllPhotosNavOptions(): JSX.Element {
    const pathname: string = usePathname();
    
    return (
        <section className='mb-5 space-x-3'>
            <AdminPagesNavLink
                link='/all-photos'
                label='All approved member photos'            
                pathname={pathname}
            />

            <AdminPagesNavLink
                link='/all-photos/pending'
                label='All pending member photos'            
                pathname={pathname}
            />
        </section>
    )
}

export default AllPhotosNavOptions