import { JSX } from 'react';
import AddForbiddenWord from '@/components/forbiddenWordsPage/AddForbiddenWord';

function ForbiddenWordsPage(): JSX.Element {
    return (
        <div className='forbidden-words-page max-w-7xl mx-auto'>

            <AddForbiddenWord />

            <section className='forbidden-words-list mb-10'>

            </section>

        </div>
    )
}

export default ForbiddenWordsPage