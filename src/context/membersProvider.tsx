'use client';

import { createContext, Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { Member } from "@prisma/client";
import { fetchAllMembersAction } from "@/actions/memberActions";
import { MemberFilters, MembersSearchParams } from "@/types/types";

type MembersContextProps = {
    members: Member[];
    loadMembers: (reset?: boolean) => Promise<void>;
    hasMore: boolean;
    setOffset: Dispatch<SetStateAction<number>>
    loading: boolean;
}

export const MembersContext = createContext<MembersContextProps | null>(null);

const PAGE_SIZE = 2;

type MembersProviderProps = {
    searchParams: Promise<MembersSearchParams>;
    children: React.ReactNode
}

export function MembersProvider({ searchParams, children }: MembersProviderProps) {
    const [members, setMembers] = useState<Member[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const filterParams = use(searchParams);

    const loadMembers = async (reset = false): Promise<void> => {
        setLoading(true);

        const { gender, minAge, maxAge } = filterParams;

        const filters: MemberFilters = {};

        if (gender) filters.gender = gender as "male" | "female";
        if (minAge) filters.minAge = parseInt(minAge);
        if (maxAge) filters.maxAge = parseInt(maxAge);

        const newMembers = await fetchAllMembersAction(filters, reset ? 0 : offset, PAGE_SIZE);

        if (reset) {
            setMembers(newMembers);
            setOffset(PAGE_SIZE);
        } else {
            setMembers((prev) => [...prev, ...newMembers]);
            setOffset((prev) => prev + PAGE_SIZE);
        }

        setHasMore(newMembers.length === PAGE_SIZE);
        setLoading(false);
    }

    useEffect(() => {
        console.log('MembersPage - useEffect');

        setOffset(0);
        loadMembers(true);
    }, [filterParams]);

    return (
        <MembersContext.Provider
            value={{
                members,
                loadMembers,
                hasMore,
                setOffset,
                loading,
            }}
        >
            {children}
        </MembersContext.Provider>
    );
}

export function useMembers(): MembersContextProps {
    const context = use(MembersContext);

    if (!context) throw new Error("Context error")

    return context;
}