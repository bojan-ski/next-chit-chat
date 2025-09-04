import { JSX } from "react";
import { Member } from "@prisma/client";
import { fetchProfileDataAction } from "@/actions/memberProfileActions";
import SetPreferences from "@/components/matchesPage/SetPreferences";
import MatchesList from "@/components/matchesPage/MatchesList";
import NoDataMessage from "@/components/NoDataMessage";

async function MatchesPage(): Promise<JSX.Element> {
    const memberExists: Member | null = await fetchProfileDataAction();

    if(!memberExists) return <NoDataMessage message="Please navigate to the Profile Setup page and complete the profile setup process" headerCss="mt-10"/>

    return (
        <div className='matches-page max-w-7xl mx-auto mt-10'>

            <SetPreferences />

            <MatchesList />

        </div >
    )
}

export default MatchesPage