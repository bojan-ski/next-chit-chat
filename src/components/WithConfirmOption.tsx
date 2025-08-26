'use client'

import { JSX, startTransition, useActionState, useEffect } from 'react';
import { FormStatus } from '@/types/types';
import toast from 'react-hot-toast';

type WithConfirmOptionProps = {
    action: (prevState: FormStatus) => Promise<FormStatus>;
    buttonLabel: string;
    pendingLabel: string;
    buttonCss?: string
};

function WithConfirmOption({ action, buttonLabel, pendingLabel, buttonCss }: WithConfirmOptionProps): JSX.Element {
    const initialState: FormStatus = {
        status: '',
        message: '',
    }
    const [state, formAction, pending] = useActionState(action, initialState);

    const handleSubmit = () => {
        if (window.confirm('Are you sure you want to proceed?')) {
            startTransition(formAction);
        }
    };

    useEffect(() => {
        console.log('useEffect - WithConfirmOption');

        if (state?.status == 'success') {
            toast.success(state.message);
        }

        if (state?.status == 'error') {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <button
            type='button'
            onClick={handleSubmit}
            disabled={pending}
            className={buttonCss}>
            {pending ? pendingLabel : buttonLabel}
        </button>
    )
}

export default WithConfirmOption