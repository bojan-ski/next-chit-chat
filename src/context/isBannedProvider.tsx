'use client';

import { createContext, JSX, ReactNode, use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type IsBannedContextProps = {
    unreadMessages: boolean
}

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

    const [unreadMessages, setUnreadMessages] = useState<boolean>(false)

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
        const response: Response = await fetch('/api/check-ban');
        const data: any = await response.json();

        if (data?.bannedMember?.banDate) {
            setCookie("banDate", data?.bannedMember?.banDate);

            router.push('/');
        }
    }

    const checkIfUnreadMessages = async () => {
        const response: Response = await fetch('/api/check-unread-messages');
        const data: any = await response.json();

        setUnreadMessages(data?.hasUnreadMessages ? data?.hasUnreadMessages : false);
    }

    useEffect(() => {
        console.log('useEffect - IsBannedProvider');

        checkBanStatus();
        checkIfUnreadMessages();
    }, [pathname]);

    return (
        <IsBannedContext.Provider
            value={{
                unreadMessages
            }}
        >
            {children}
        </IsBannedContext.Provider>
    );
}

export function useIsBanned(): IsBannedContextProps {
    const context: IsBannedContextProps | null = use(IsBannedContext);

    if (!context) throw new Error("IsBannedContext error");

    return context;
}
