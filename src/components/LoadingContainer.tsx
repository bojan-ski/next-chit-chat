import { JSX } from 'react';

function LoadingContainer(): JSX.Element {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="h-40 w-40 animate-spin rounded-full border-4 border-[#C05C41] border-t-transparent shadow-lg"></div>
        </div>
    );
}

export default LoadingContainer;
