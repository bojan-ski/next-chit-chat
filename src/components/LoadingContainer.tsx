import { JSX } from 'react';
import { Skeleton } from './ui/skeleton';

function LoadingContainer(): JSX.Element {
    return (
        <Skeleton className="h-12 w-12 rounded-full" />
    )
}

export default LoadingContainer;
