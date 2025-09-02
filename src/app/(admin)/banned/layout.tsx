import { JSX, ReactNode } from 'react';
import PageNavOptions from '@/components/PageNavOptions';

function Layout({ children }: { children: ReactNode }): JSX.Element {
    const pageLinks = [
        { link: '/banned', label: "Banned members" },
        { link: '/banned/reports', label: "Pending reports" },
    ];

    return (
        <div className='max-w-7xl mx-auto mt-10'>

            <PageNavOptions pageLinks={pageLinks} />

            {children}

        </div>
    )
}

export default Layout