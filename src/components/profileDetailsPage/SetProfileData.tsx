'use client';

import { JSX, useActionState, useEffect } from "react";
import { FormStatus } from "@/types/types";
import { setProfileDataAction } from "@/actions/memberProfileActions";
import FormInput from "../FormInput";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

function SetProfileData({ userId }: { userId: string }): JSX.Element {
    const initialState: FormStatus = {
        status: '',
        message: '',
    }
    const [state, formAction, pending] = useActionState(setProfileDataAction, initialState);

    useEffect(() => {
        if (state.status == 'success') {
            toast.success(state.message);
        }

        if (state.status == 'error') {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div>
            <form action={formAction}>
                {/* userId - hidden */}
                <input type="hidden" name="userId" value={userId} />
                <FormInput
                    type='hidden'
                    name='userId'
                    value={userId}
                />

                {/* username */}
                <FormInput
                    type='text'
                    name='username'
                    placeholder='Enter username'
                    required={true}
                />

                {/* city */}
                <FormInput
                    type='text'
                    name='city'
                    placeholder='Enter city'
                    required={true}
                />

                {/* state */}
                <FormInput
                    type='text'
                    name='state'
                    placeholder='Enter state'
                    required={true}
                />

                {/* description */}
                <FormInput
                    type='text'
                    name='description'
                    placeholder='Describe yourself'
                    required={true}
                />

                <Button
                    type='submit'
                    disabled={pending}
                    className='capitalize w-28 text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer'>
                    {pending ? 'Updating...' : 'Update'}
                </Button>
            </form>
        </div>
    )
}

export default SetProfileData