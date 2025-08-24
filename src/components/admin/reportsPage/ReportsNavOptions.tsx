'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import AdminPagesNavLink from '../AdminPagesNavLink';

function ReportsNavOptions(): JSX.Element {
  const pathname: string = usePathname();

  return (
    <section className='mb-5 space-x-3'>
      <AdminPagesNavLink
        link='/banned'
        label='Banned members'
        pathname={pathname}
      />

      <AdminPagesNavLink
        link='/banned/reports'
        label='Pending reports'
        pathname={pathname}
      />
    </section>
  )
}

export default ReportsNavOptions