import { JSX } from "react";
import { Member } from "@prisma/client";
import MembersListContainer from "../MembersListContainer";

function MembersList({ members }: { members: Member[] }): JSX.Element {
    return (
        <MembersListContainer
            noDataMessage='There are no members'
            members={members}
        />
    )
}

export default MembersList