import { JSX } from 'react';
import AddForbiddenWord from '@/components/forbiddenWordsPage/AddForbiddenWord';
import ForbiddenWordsList from '@/components/forbiddenWordsPage/ForbiddenWordsList';

function ForbiddenWordsPage(): JSX.Element {
    return (
        <div className='forbidden-words-page max-w-7xl mx-auto mt-10'>

            <AddForbiddenWord />

            <ForbiddenWordsList />
            
        </div>
    )
}

export default ForbiddenWordsPage