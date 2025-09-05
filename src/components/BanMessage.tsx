import { JSX } from 'react';
import { cookies } from 'next/headers';
import { formatDate } from '@/utils/utils';
import { currentUser } from '@clerk/nextjs/server';

async function BanMessage(): Promise<JSX.Element> {
    const user = await currentUser();
    const cookieStore = await cookies()
    const banDate: string | undefined = cookieStore.get('banDate')?.value;

    if (user && banDate) {
        return (
            <div className="user-banned-message fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="border border-[#E5C6AC] rounded-lg p-10 bg-white shadow-lg pointer-events-auto">
                    <h2 className="text-center text-[#7B4B3A] text-4xl font-bold">
                        You are banned until: {formatDate(banDate)}
                    </h2>
                </div>
            </div>
        )
    }

    return <></>
}

export default BanMessage