import { JSX } from 'react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage(): JSX.Element {
    return <div className='sign-up-page flex justify-center mt-20'>
        <SignUp />
    </div>
}