import { JSX } from 'react';
import { fetchSourceLikesAction } from '@/actions/likeActions';
import { Member } from '@prisma/client';
import MembersListContainer from '@/components/MembersListContainer';

async function MyLikesPage(): Promise<JSX.Element> {
    const myLikesList: Member[] = await fetchSourceLikesAction();

    return (
        <MembersListContainer
            noDataMessage='No members liked'
            members={myLikesList}
        />
    )
}

export default MyLikesPage