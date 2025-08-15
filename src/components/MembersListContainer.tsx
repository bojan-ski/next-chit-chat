import { JSX } from 'react';
import { Member } from '@prisma/client';
import NoDataMessage from './NoDataMessage';
import MemberCard from './MemberCard';

type MembersListContainerProps = {
    noDataMessage: string;
    members: Member[];
}

function MembersListContainer({ noDataMessage, members }: MembersListContainerProps): JSX.Element {
    return (
        members.length == 0 ? (
            <NoDataMessage message={noDataMessage} />
        ) : (
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map(member => <MemberCard key={member.id} member={member} />)}
            </section>
        )
    )
}

export default MembersListContainer