import { JSX } from 'react';
import PageNavOptions from '@/components/PageNavOptions';

function layout({ children }: { children: React.ReactNode }): JSX.Element {
    const pageLinks = [
        { link: '/likes', label: "Mutual Likes" },
        { link: '/likes/my-likes', label: "My Likes" },
        { link: '/likes/like-me', label: "Like me" }
    ]

    return (
        <div className='max-w-7xl mx-auto mt-10'>
            {/* nav links */}
            <PageNavOptions pageLinks={pageLinks} />

            {/* selected content */}
            {children}
        </div>
    )
}

export default layout