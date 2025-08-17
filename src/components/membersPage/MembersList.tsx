import { JSX } from "react";
import { fetchAllMembersAction } from "@/actions/memberProfileActions";
import { Member } from "@prisma/client";
import { MemberFilters, MembersSearchParams } from "@/types/types";
import MembersListContainer from "../MembersListContainer";

async function MembersList({ searchParams }: { searchParams: Promise<MembersSearchParams> }): Promise<JSX.Element> {
    const { gender, minAge, maxAge } = await searchParams;

    const filters: MemberFilters = {};

    if (gender) {
        filters.gender = gender as 'male' | 'female';
    }

    if (minAge) {
        filters.minAge = parseInt(minAge);
    }

    if (maxAge) {
        filters.maxAge = parseInt(maxAge);
    }

    const members: Member[] = await fetchAllMembersAction(filters);

    return (
        <MembersListContainer
            noDataMessage='There are no members'
            members={members}
        />
    )
}

export default MembersList