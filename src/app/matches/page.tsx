import { JSX } from "react";
import SetPreferences from "@/components/matchesPage/SetPreferences";
import MatchesList from "@/components/matchesPage/MatchesList";

async function MatchesPage(): Promise<JSX.Element> {
    return (
        <div className='matches-page max-w-7xl mx-auto mt-10'>

            <SetPreferences />

            <MatchesList />

        </div >
    )
}

export default MatchesPage