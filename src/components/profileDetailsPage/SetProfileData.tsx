'use client';

import { JSX } from "react";
import { setProfileDataAction } from "@/actions/memberProfileActions";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import FormWrapper from "../FormWrapper";

async function SetProfileData({ userId }: { userId: string }): Promise<JSX.Element> {
    return (
        <FormWrapper
            action={setProfileDataAction}
            buttonLabel='Update'
            pendingLabel='Updating...'
        >
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
            <FormTextarea
                name='description'
                placeholder='Describe yourself'
                required={true}
            />
        </FormWrapper>
    )
}

export default SetProfileData