import { JSX } from 'react';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { MdLogout } from "react-icons/md";

function SignOutOption(): JSX.Element {
    const handleSignOut = () => {
        if (confirm('Are you sure you want to log out?')) {
            toast.success('You have logged out');
        };
    };

    return (
        <SignOutButton>
            <Link
                href={'/'}
                className='text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white transition py-2 px-3 rounded-md capitalize cursor-pointer'
                onClick={handleSignOut}>
                <MdLogout />
            </Link>
        </SignOutButton>
    )
}

export default SignOutOption