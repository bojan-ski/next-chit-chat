import { JSX } from 'react';
import { MembersSearchParams } from '@/types/types';
import MembersList from '@/components/membersPage/MembersList';
import Filters from '@/components/membersPage/Filters';

async function MembersPage({ searchParams }: { searchParams: Promise<MembersSearchParams> }): Promise<JSX.Element> {
  return (
    <div className='members-page max-w-7xl mx-auto my-10 h-[80vh]'>

      <Filters />

      <MembersList searchParams={searchParams} />

    </div>
  )
}

export default MembersPage