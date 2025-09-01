import { JSX } from 'react';
import AddForbiddenWord from '@/components/admin/forbiddenWordsPage/AddForbiddenWord';
import ForbiddenWordsList from '@/components/admin/forbiddenWordsPage/ForbiddenWordsList';

function ForbiddenWordsPage(): JSX.Element {
    return (
        <div className='forbidden-words-page max-w-7xl mx-auto my-10'>

            <AddForbiddenWord />

            <ForbiddenWordsList />
            
        </div>
    )
}

export default ForbiddenWordsPage