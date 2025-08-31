import { JSX } from 'react';
import LoadingContainer from '@/components/LoadingContainer';

function loading(): JSX.Element {
    return (
        <div className="md:col-span-7 lg:col-span-8 xl:col-span-9 border border-[#E5C6AC] rounded-lg p-5 ">
            <LoadingContainer />
        </div>
    )
}

export default loading

