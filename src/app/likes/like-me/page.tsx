import { JSX } from 'react';
import { fetchSourceLikesAction } from '@/actions/likeActions';
import { Member } from '@prisma/client';
import MembersListContainer from '@/components/MembersListContainer';

async function LikeMePage(): Promise<JSX.Element> {
    const likeMeList: Member[] = await fetchSourceLikesAction();

    return (
        <MembersListContainer
            noDataMessage='You have not received any likes'
            members={likeMeList}
        />
    )
}

export default LikeMePage