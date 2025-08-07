import { JSX } from 'react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage(): JSX.Element {
    return <div className='sign-in-page flex justify-center mt-20'>
        <SignIn />
    </div>
}