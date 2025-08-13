import { JSX } from 'react';
import MembersList from '@/components/membersPage/MembersList';

async function MembersPage(): Promise<JSX.Element> {
  return (
    <div className='members-page max-w-7xl mx-auto my-10 h-[80vh]'>

      <MembersList />

    </div>
  )
}

export default MembersPage