import { JSX, ReactNode } from 'react';
import { MembersProvider } from '@/context/membersProvider';

async function layout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    return (
        <MembersProvider>
            {children}
        </MembersProvider>
    )
}

export default layout