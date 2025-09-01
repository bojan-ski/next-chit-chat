'use client';

import { useEffect } from "react";
import { useIsBanned } from "@/context/isBannedProvider";
import toast from "react-hot-toast";

function UnreadMessageToast(): null {
    const { unreadMessages } = useIsBanned();

    useEffect(() => {
        console.log('useEffect - UnreadMessageToast');


        if (unreadMessages) {
            toast.success("You have new messages");
        }
    }, [unreadMessages]);

    return null;
}

export default UnreadMessageToast;
