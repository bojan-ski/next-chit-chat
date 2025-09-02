import { JSX } from 'react';
import { BannedMember } from '@prisma/client';
import { formatDate } from '@/utils/utils';
import NoDataMessage from '@/components/NoDataMessage';

function MemberPreviousBans({ bans }: { bans: BannedMember[] }): JSX.Element {
  return (
    <section className="previous-bans border min-h-full max-h-[600px] overflow-y-scroll border-[#E5C6AC] rounded-lg p-5">
      {bans.length == 0 ? (
        <NoDataMessage message="User has not been banned" />
      ) : (
        bans.map((ban) => (
          <div key={ban.id} className="border-b border-[#E5C6AC] pb-2 mb-2">
            <p className="text-sm">
              {ban.banReason}
            </p>
            <p className="text-xs text-[#A67C65]">
              {formatDate(ban.banDate)}
            </p>
          </div>
        ))
      )}
    </section>
  );
}

export default MemberPreviousBans;
