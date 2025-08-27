'use client';

import { createContext, JSX, ReactNode, use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type IsBannedContextProps = {}

export const IsBannedContext = createContext<IsBannedContextProps | null>(null);

type IsBannedProviderProps = {
    children: ReactNode
}

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null; // this is for the console error

    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()!.split(';').shift() || null;

    return null;
}

function setCookie(name: string, value: string): void {
    document.cookie = `${name}=${value}; path=/`;
}

function clearCookie(): void {
    document.cookie = 'banDate=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export function IsBannedProvider({ children }: IsBannedProviderProps): JSX.Element {
    const pathname = usePathname();
    const router = useRouter();

    const checkBanStatus = async () => {
        const banDate: string | null = getCookie("banDate");

        if (banDate) {
            const banActive: boolean = new Date(banDate) >= new Date();            

            if (!banActive) {
                clearCookie();
                await checkIfBanned();
            } 
        } else {
            await checkIfBanned();
        }
    };

    const checkIfBanned = async () => {
        try {
            const response: Response = await fetch('/api/check-ban');
            const data: any = await response.json();

            if (data?.bannedMember?.banDate) {
                setCookie("banDate", data?.bannedMember?.banDate);

                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('useEffect - IsBannedProvider');

        checkBanStatus();
    }, [pathname]);

    return (
        <IsBannedContext.Provider
            value={{}}
        >
            {children}
        </IsBannedContext.Provider>
    );
}

export function useIsBanned() {
    const context = use(IsBannedContext);

    if (!context) throw new Error("IsBannedContext error");

    return context;
}
