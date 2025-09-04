import { JSX } from "react";
import { fetchProfileDataAction, setProfileDataAction } from "@/actions/memberProfileActions";
import { Member } from "@prisma/client";
import FormWrapper from "../FormWrapper";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import FormSelect from "../FormSelect";
import { formatDateForInput } from "@/utils/utils";

async function SetProfileData(): Promise<JSX.Element> {
    const profileData: Member | null = await fetchProfileDataAction();

    return (
        <FormWrapper
            action={setProfileDataAction}
            buttonLabel='Update'
            pendingLabel='Updating...'
        >
            {/* username */}
            <FormInput
                type='text'
                name='username'
                placeholder='Enter username'
                defaultValue={profileData?.username ? profileData?.username : ''}
                required={true}
            />

            {/* gender */}
            <FormSelect
                name="gender"
                defaultValue={profileData?.gender ? profileData?.gender : ""}
                required={true}
            />

            {/* date of birth */}
            <FormInput
                type='date'
                name='dateOfBirth'
                defaultValue={profileData?.dateOfBirth ? formatDateForInput(profileData?.dateOfBirth) : ''}
                required={true}
            />

            {/* city */}
            <FormInput
                type='text'
                name='city'
                placeholder='Enter city'
                defaultValue={profileData?.city ? profileData?.city : ''}
                required={true}
            />

            {/* state */}
            <FormInput
                type='text'
                name='state'
                placeholder='Enter state'
                defaultValue={!!profileData?.state ? profileData?.state : ''}
                required={true}
            />

            {/* description */}
            <FormTextarea
                name='description'
                placeholder='Describe yourself'
                defaultValue={profileData?.description ? profileData?.description : ''}
                required={true}
            />
        </FormWrapper>
    )
}

export default SetProfileData