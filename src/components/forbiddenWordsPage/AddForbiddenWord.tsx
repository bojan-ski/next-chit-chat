'use client';

import { JSX, useActionState, useEffect } from 'react';
import { addNewForbiddenWordAction } from '@/actions/adminActions';
import { FormStatus } from '@/types/types';
import FormInput from '../FormInput';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

function AddForbiddenWord(): JSX.Element {
    const initialState: FormStatus = {
        status: '',
        message: '',
    }
    const [state, formAction, pending] = useActionState(addNewForbiddenWordAction, initialState);

    useEffect(() => {
        if (state.status == 'success') {
            toast.success(state.message);
        }

        if (state.status == 'error') {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <section className='add-forbidden-word border-b border-[#E5C6AC] pb-5 mb-10'>
            <form action={formAction}>
                <div className='flex space-x-2'>
                    <FormInput
                        type='text'
                        name='forbidden_word'
                        placeholder='Add forbidden word'
                        required={true}
                    />

                    <Button
                        type='submit'
                        disabled={pending}
                        className='capitalize w-28 text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer'>
                        {pending ? 'Adding...' : 'Add'}
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddForbiddenWord