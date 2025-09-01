import { JSX } from 'react';
import { fetchForbiddenWordsAction } from '@/actions/forbiddenWordAction';
import { ForbiddenWord } from '@prisma/client';
import ForbiddenWordCard from './ForbiddenWordCard';
import NoDataMessage from '../../NoDataMessage';

async function ForbiddenWordsList(): Promise<JSX.Element> {
    const forbiddenWords: ForbiddenWord[] = await fetchForbiddenWordsAction();

    if (forbiddenWords.length == 0) return <NoDataMessage message='No forbidden words added' />

    return (
        <section className='forbidden-words-list grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
            {forbiddenWords?.map(word => <ForbiddenWordCard key={word.id} word={word} />)}
        </section>
    )
}

export default ForbiddenWordsList