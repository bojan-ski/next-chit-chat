import { JSX } from 'react';
import { fetchBannedMembersAction } from '@/actions/reportActions';
import { BannedMemberWithDetails } from '@/types/types';
import NoDataMessage from '@/components/NoDataMessage';
import BannedMemberCard from '@/components/admin/bannedMembersPage/BannedMemberCard';

async function BannedMembersPage(): Promise<JSX.Element> {
  const bannedMembers: BannedMemberWithDetails[] = await fetchBannedMembersAction();

  return (
    <section className='banned-members-page max-w-7xl mb-10 mx-auto'>
      {bannedMembers.length == 0 ? (
        <NoDataMessage message="There are no banned members" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bannedMembers.map(bannedMember => <BannedMemberCard key={bannedMember.member.id} bannedMember={bannedMember} />)}
        </div>
      )}
    </section>
  )
}

export default BannedMembersPage