import { JSX } from 'react';
import { Button } from '../ui/button';

type LoadMoreMembersOptionProps = {
    loadMembers: (reset?: boolean) => Promise<void>;
    loading: boolean;
}

function LoadMoreMembersOption({ loadMembers, loading }: LoadMoreMembersOptionProps): JSX.Element {
    return (
        <div className="flex justify-center">
            <Button
                className='text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white transition py-5 px-6 rounded-md capitalize cursor-pointer'
                onClick={() => loadMembers()}
                disabled={loading}
            >
                {loading ? "Loading..." : "Load More"}
            </Button>
        </div>
    )
}

export default LoadMoreMembersOption