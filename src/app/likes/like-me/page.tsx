import { JSX } from 'react';
import { fetchTargetLikesAction } from '@/actions/likeActions';
import { Member } from '@prisma/client';
import MembersListContainer from '@/components/MembersListContainer';

async function LikeMePage(): Promise<JSX.Element> {
    const likeMeList: Member[] = await fetchTargetLikesAction();

    return (
        <MembersListContainer
            noDataMessage='You have not received any likes'
            members={likeMeList}
        />
    )
}

export default LikeMePage