'use client';

import { useEffect } from "react";
import { useGlobalContext } from "@/context/globalProvider";
import toast from "react-hot-toast";

function UnreadMessageToast(): null {
    const { unreadMessages } = useGlobalContext();

    useEffect(() => {
        console.log('useEffect - UnreadMessageToast');


        if (unreadMessages) {
            toast.success("You have new messages");
        }
    }, [unreadMessages]);

    return null;
}

export default UnreadMessageToast;
