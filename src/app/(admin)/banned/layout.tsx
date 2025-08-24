import { JSX } from 'react';
import ReportsNavOptions from '@/components/admin/reportsPage/ReportsNavOptions';

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className='max-w-7xl mx-auto mt-10'>
            {/* nav links */}
            <ReportsNavOptions />

            {/* selected content */}
            {children}
        </div>
    )
}

export default Layout