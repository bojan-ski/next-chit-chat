import { JSX } from 'react';
import { fetchForbiddenWordsAction } from '@/actions/adminActions';
import { ForbiddenWord } from '@prisma/client';
import ForbiddenWordCard from './ForbiddenWordCard';

async function ForbiddenWordsList(): Promise<JSX.Element> {
    const forbiddenWords: ForbiddenWord[] | null = await fetchForbiddenWordsAction();

    return (
        <section className='forbidden-words-list grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
            {forbiddenWords?.map(word => {
                return <ForbiddenWordCard key={word.id} word={word} />
            })}
        </section>
    )
}

export default ForbiddenWordsList