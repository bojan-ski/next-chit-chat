'use client';

import { createContext, JSX, ReactNode, use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type GlobalContextProps = {
    unreadMessages: boolean
}

export const globalContext = createContext<GlobalContextProps | null>(null);

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

type GlobalProviderProps = {
    children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps): JSX.Element {
    const user = useUser();
    const pathname = usePathname();
    const router = useRouter();    

    const [unreadMessages, setUnreadMessages] = useState<boolean>(false)

    const checkBanStatus = async (): Promise<void> => {
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

    const checkIfBanned = async (): Promise<void> => {
        const response: Response = await fetch('/api/check-ban');
        const data: any = await response.json();

        if (data?.bannedMember?.banDate) {
            setCookie("banDate", data?.bannedMember?.banDate);

            router.push('/');
        }
    }

    const checkIfUnreadMessages = async (): Promise<void> => {
        const response: Response = await fetch('/api/check-unread-messages');
        const data: any = await response.json();

        setUnreadMessages(data?.hasUnreadMessages ? data?.hasUnreadMessages : false);
    }

    useEffect(() => {
        console.log('useEffect - IsBannedProvider');

        if(user?.isSignedIn){            
            checkBanStatus();
            checkIfUnreadMessages();
        };
    }, [pathname]);

    return (
        <globalContext.Provider
            value={{
                unreadMessages
            }}
        >
            {children}
        </globalContext.Provider>
    );
}

export function useGlobalContext(): GlobalContextProps {
    const context: GlobalContextProps | null = use(globalContext);

    if (!context) throw new Error("GlobalContext error");

    return context;
}