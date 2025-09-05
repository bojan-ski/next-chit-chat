'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className='error-page max-w-7xl mx-auto my-10'>
            <div className='text-center mt-40'>
                <h2 className='text-6xl font-semibold text-[#7B4B3A] mb-10'>
                    There was an error
                </h2>

                <Button
                    className='text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white transition py-5 px-6 rounded-md capitalize cursor-pointer text-xl font-semibold'
                    onClick={
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </div>
        </div>
    )
}