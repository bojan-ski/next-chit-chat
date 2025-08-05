import { JSX } from 'react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage(): JSX.Element {
    return <div className='flex justify-center mt-20'>
        <SignUp />
    </div>
}