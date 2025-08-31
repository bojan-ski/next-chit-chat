'use client'

import { JSX, ReactNode, useTransition } from 'react';
import { FormStatus } from '@/types/types';
import toast from 'react-hot-toast';

type WithConfirmOptionProps = {
    action: (prevState: FormStatus) => Promise<FormStatus>;
    children?: ReactNode;
    buttonCss?: string;
    buttonLabel?: string;
    pendingLabel?: string;
};

function WithConfirmOption({ action, children, buttonCss, buttonLabel, pendingLabel }: WithConfirmOptionProps): JSX.Element {
    const [pending, startTransition] = useTransition();

    const handleSubmit = () => {
        if (window.confirm('Are you sure you want to proceed?')) {
            startTransition(async () => {
                const result: FormStatus = await action(
                    {
                        status: '',
                        message: ''
                    }
                );

                if (result?.status === 'success') {
                    toast.success(result.message);
                } else if (result?.status === 'error') {
                    toast.error(result.message);
                }
            });
        }
    };

    return (
        <button
            type='button'
            onClick={handleSubmit}
            disabled={pending}
            className={buttonCss}>

            {children}

            {pending ? pendingLabel : buttonLabel}

        </button>
    )
}

export default WithConfirmOption