import { JSX } from 'react';
import { addNewForbiddenWordAction } from '@/actions/forbiddenWordAction';
import FormInput from '../../FormInput';
import FormWrapper from '../../FormWrapper';

function AddForbiddenWord(): JSX.Element {
    return (
        <section className='add-forbidden-word border-b border-[#E5C6AC] pb-3 mb-10'>
            <FormWrapper
                action={addNewForbiddenWordAction}
                formCss='flex space-x-2'
                buttonLabel='Add'
                pendingLabel='Adding...'
            >
                <FormInput
                    type='text'
                    name='forbidden_word'
                    placeholder='Add forbidden word'
                    additionInputClasses="w-[300px]"
                    required={true}
                />
            </FormWrapper>
        </section>
    )
}

export default AddForbiddenWord