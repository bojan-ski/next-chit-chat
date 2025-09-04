import { JSX, ReactNode } from 'react';
import { Member } from '@prisma/client';
import { fetchProfileDataAction } from '@/actions/memberProfileActions';
import NoDataMessage from '@/components/NoDataMessage';
import { MembersProvider } from '@/context/membersProvider';

async function layout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    const memberExists: Member | null = await fetchProfileDataAction();

    if(!memberExists) return <NoDataMessage message="Please navigate to the Profile Setup page and complete the profile setup process" headerCss="mt-10"/>

    return (
        <MembersProvider>
            {children}
        </MembersProvider>
    )
}

export default layout