import { JSX } from "react";
import { fetchAllMembersAction } from "@/actions/memberProfileActions";
import { Member } from "@prisma/client";
import MemberCard from "../MemberCard";
import NoDataMessage from "../NoDataMessage";

async function MembersList(): Promise<JSX.Element> {
    const members: Member[] = await fetchAllMembersAction();

    return (
        members.length == 0 ? (
            <NoDataMessage message="There are no members" />
        ) : (
            <section className="members-list grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {members.map(member => <MemberCard key={member.id} member={member} />)}
            </section>
        )
    )
}

export default MembersList