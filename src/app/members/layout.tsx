import { JSX } from 'react';
import { MembersProvider } from '@/context/membersProvider';

async function layout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
    return (
        <MembersProvider>
            {children}
        </MembersProvider>
    )
}

export default layout