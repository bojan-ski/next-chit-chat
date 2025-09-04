import { JSX } from 'react';
import { fetchUserMatchesAction } from '@/actions/preferencesAction';
import { UserMatches } from '@/types/types';
import NoDataMessage from '../NoDataMessage';
import MemberCard from '../MemberCard';

async function MatchesList(): Promise<JSX.Element> {
    const userMatches: UserMatches[] = await fetchUserMatchesAction();

    return (
        <>
            {userMatches.length == 0 ? (
                <NoDataMessage message='There are no matches' />
            ) : (
                <section className="matches-list grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {userMatches.map(match => <MemberCard key={match.id} member={match} />)}
                </section>
            )}
        </>
    )
}

export default MatchesList