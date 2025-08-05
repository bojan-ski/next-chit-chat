import { JSX } from 'react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage(): JSX.Element {
    return <div className='flex justify-center mt-20'>
        <SignIn />
    </div>
}