import { JSX, ReactNode } from 'react';
import PageNavOptions from '@/components/PageNavOptions';

function layout({ children }: { children: ReactNode }): JSX.Element {
    const pageLinks = [
        { link: '/likes', label: "Mutual Likes" },
        { link: '/likes/my-likes', label: "My Likes" },
        { link: '/likes/like-me', label: "Like me" }
    ];

    return (
        <div className='max-w-7xl mx-auto my-10'>

            <PageNavOptions pageLinks={pageLinks} />

            {children}

        </div>
    )
}

export default layout