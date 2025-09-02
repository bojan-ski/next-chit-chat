import { JSX, ReactNode } from 'react';
import PageNavOptions from '@/components/PageNavOptions';

function layout({ children }: { children: ReactNode }): JSX.Element {
    const pageLinks = [
        { link: '/all-photos', label: "All approved member photos" },
        { link: '/all-photos/pending', label: "All pending member photos" },
    ];

    return (
        <div className='max-w-7xl mx-auto mt-10'>

            <PageNavOptions pageLinks={pageLinks} />

            {children}

        </div>
    )
}

export default layout