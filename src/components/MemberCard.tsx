import { JSX } from 'react';
import Link from 'next/link';
import { Member } from '@prisma/client';
import MemberCardProfileDetails from './MemberCardProfileDetails';

function MemberCard({ member }: { member: Member }): JSX.Element {
    return (
        <Link
            href={`/members/${member.id}`}
        >
            <MemberCardProfileDetails member={member} />
        </Link>
    )
}

export default MemberCard