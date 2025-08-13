import { JSX } from 'react';
import FormSubmitButton from '../FormSubmitButton';

type ChangePhotoStatusOptionProps = {
    action: () => void;
    buttonCss: string;
    buttonLabel: string
}

function ChangePhotoStatusOption({ action, buttonCss, buttonLabel }: ChangePhotoStatusOptionProps): JSX.Element {
    return (
        <form action={action}>
            <FormSubmitButton
                buttonCss={buttonCss}
            >
                {buttonLabel}
            </FormSubmitButton>
        </form>
    )
}

export default ChangePhotoStatusOption