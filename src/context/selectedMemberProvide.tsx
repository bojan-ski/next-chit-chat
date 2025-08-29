'use client';

import { createContext, ReactNode, use } from "react";
import { Member, Photo } from "@prisma/client";

type SelectedMemberContextProps = {
    memberData: (Member & { photoGallery: Photo[] });
    isLiked: boolean;
}

export const SelectedMemberContext = createContext<SelectedMemberContextProps | null>(null);

type SelectedMemberProviderProps = {
    memberData: (Member & { photoGallery: Photo[] });
    isLiked: boolean
    children: ReactNode
}

export function SelectedMemberProvider({ memberData, isLiked, children }: SelectedMemberProviderProps) {
    return (
        <SelectedMemberContext.Provider
            value={{
                memberData,
                isLiked
            }}
        >
            {children}
        </SelectedMemberContext.Provider>
    );
}

export function useSelectedMember() {
    const context = use(SelectedMemberContext);

    if (!context) throw new Error("SelectedMemberContext error");

    return context;
}