import { JSX } from "react";
import { fetchAllMembersAction } from "@/actions/memberProfileActions";
import { Member } from "@prisma/client";
import MembersListContainer from "../MembersListContainer";

async function MembersList(): Promise<JSX.Element> {
    const members: Member[] = await fetchAllMembersAction();

    return (
        <MembersListContainer
            noDataMessage='There are no members'
            members={members}
        />
    )
}

export default MembersList