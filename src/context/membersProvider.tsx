'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Member } from "@prisma/client";
import { fetchAllMembersAction } from "@/actions/memberActions";
import { MemberFilters } from "@/types/types";

type MembersContextProps = {
    members: Member[];
    hasMore: boolean;
    loading: boolean;
    handleLoadMoreMembers: () => void;
    gender: string[];
    ageRange: number[];
    setAgeRange: Dispatch<SetStateAction<number[]>>;
    handleFilterChange: (updatedGender: string[], updatedAgeRange: number[]) => void;
}

export const MembersContext = createContext<MembersContextProps | null>(null);

const PAGE_SIZE = 12;

type MembersProviderProps = {
    children: ReactNode
}

export function MembersProvider({ children }: MembersProviderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [members, setMembers] = useState<Member[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [gender, setGender] = useState<string[]>(
        searchParams.get('gender')?.split(',') || ['male', 'female']
    );
    const [ageRange, setAgeRange] = useState<number[]>([
        parseInt(searchParams.get('minAge') || '18'),
        parseInt(searchParams.get('maxAge') || '80')
    ]);

    const loadMembers = async (reset = false, offsetParam: number, filters?: MemberFilters): Promise<void> => {
        setLoading(true);

        const newMembers = await fetchAllMembersAction(filters, offsetParam, PAGE_SIZE);

        if (reset) {
            setMembers(newMembers);
        } else {
            setMembers((prev) => {
                return [...prev, ...newMembers]
            });
        }

        setHasMore(newMembers.length === PAGE_SIZE);
        setLoading(false);
    }

    const handleFilterChange = (updatedGender: string[], updatedAgeRange: number[]): void => {
        setGender(updatedGender);
        setAgeRange(updatedAgeRange);

        const filters: MemberFilters = {};

        if (!(updatedGender.includes('male') && updatedGender.includes('female'))) {
            filters.gender = updatedGender[0] as "male" | "female";
        }

        filters.minAge = updatedAgeRange[0];
        filters.maxAge = updatedAgeRange[1];

        const params = new URLSearchParams();

        if (filters.gender) params.set("gender", filters.gender);

        params.set('minAge', updatedAgeRange[0].toString());
        params.set('maxAge', updatedAgeRange[1].toString());
        params.set("offset", "0");

        loadMembers(true, 0, filters);

        router.push(`/members?${params.toString()}`);
    };

    const handleLoadMoreMembers = (): void => {
        const offsetParam = parseInt(searchParams.get("offset") ?? "0");
        const newOffset = offsetParam + PAGE_SIZE;

        const filters: MemberFilters = {};

        if (!(gender.includes("male") && gender.includes("female"))) {
            filters.gender = gender[0] as "male" | "female";
        }

        filters.minAge = ageRange[0];
        filters.maxAge = ageRange[1];

        loadMembers(false, newOffset, filters);

        const params = new URLSearchParams(searchParams.toString());

        params.set("offset", newOffset.toString());
        router.push(`/members?${params.toString()}`);
    }

    useEffect(() => {
        console.log("useEffect - MembersPage");

        if (members.length == 0) loadMembers(true, 0);
    }, []);

    return (
        <MembersContext.Provider
            value={{
                members,
                hasMore,
                loading,
                handleLoadMoreMembers,
                gender,
                ageRange,
                setAgeRange,
                handleFilterChange
            }}
        >
            {children}
        </MembersContext.Provider>
    );
}

export function useMembers(): MembersContextProps {
    const context = use(MembersContext);

    if (!context) throw new Error("MembersContext error");

    return context;
}