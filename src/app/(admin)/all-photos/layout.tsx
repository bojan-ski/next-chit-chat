import { JSX } from 'react';
import AllPhotosNavOptions from '@/components/allPhotosPage/AllPhotosNavOptions';

function layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className='max-w-7xl mx-auto mt-10'>
            {/* nav links */}
            <AllPhotosNavOptions />

            {/* selected content */}
            {children}
        </div>
    )
}

export default layout