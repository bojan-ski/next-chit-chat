import { JSX } from 'react';
import { fetchMutualLikesAction } from '@/actions/likeActions';
import { Member } from '@prisma/client';
import MembersListContainer from '@/components/MembersListContainer';

async function LikesPage(): Promise<JSX.Element> {
    const mutualLikes: Member[] = await fetchMutualLikesAction();

    return (
        <MembersListContainer
            noDataMessage='There are no mutual likes'
            members={mutualLikes}
        />
    )
}

export default LikesPage