import { JSX } from 'react';

type ReportCardMemberDataProps = {
    label: string;
    username: string;
}

function ReportCardMemberData({ label, username }: ReportCardMemberDataProps): JSX.Element {
    return (
        <div className="text-sm">
            <span className='block text-[#C05C41]'>
                {label}:
            </span>
            <span className='font-bold text-[#7B4B3A]'>
                {username}
            </span>
        </div>
    )
}

export default ReportCardMemberData