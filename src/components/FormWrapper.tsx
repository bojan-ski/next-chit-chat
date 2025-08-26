'use client';

import { JSX, ReactNode, useActionState, useEffect } from "react";
import { FormStatus } from "@/types/types";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type FormWrapperProps = {
    children?: ReactNode,
    action: any,
    formCss?: string,
    buttonLabel: string,
    pendingLabel: string
    encType?: string
}

function FormWrapper({ children, action, formCss, buttonLabel, pendingLabel, encType = undefined }: FormWrapperProps): JSX.Element {
    const initialState: FormStatus = {
        status: '',
        message: '',
    }
    const [state, formAction, pending] = useActionState(action, initialState);

    useEffect(() => {
        console.log('useEffect - FormWrapper');

        if (state?.status == 'success') {
            toast.success(state.message);
        }

        if (state?.status == 'error') {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className={formCss}
            encType={encType}
        >
            {children}

            <Button
                type='submit'
                disabled={pending}
                className='capitalize w-28 text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer'>
                {pending ? pendingLabel : buttonLabel}
            </Button>
        </form>
    )
}

export default FormWrapper