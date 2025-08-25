import { JSX } from 'react';
import { BannedMember } from '@prisma/client';
import { formatTime } from '@/utils/utils';
import NoDataMessage from '@/components/NoDataMessage';

type MemberPreviousBansProps = {
  bans: BannedMember[];
};

function MemberPreviousBans({ bans }: MemberPreviousBansProps): JSX.Element {
  return (
    <div className="previous-bans border min-h-full max-h-[600px] overflow-scroll border-[#E5C6AC] rounded-lg p-5">
      {bans.length === 0 ? (
        <NoDataMessage message="User has not been banned" />
      ) : (
        bans.map((ban) => (
          <div key={ban.id} className="border-b border-[#E5C6AC] pb-2 mb-2">
            <p className="text-sm">
              {ban.banReason}
            </p>
            <p className="text-xs text-[#A67C65]">
              {formatTime(ban.banDate)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MemberPreviousBans;
