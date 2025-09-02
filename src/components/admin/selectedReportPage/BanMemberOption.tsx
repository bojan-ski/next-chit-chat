import { JSX } from 'react';
import { banReportedMemberAction } from '@/actions/reportActions';
import { Message, Photo } from '@prisma/client';
import { FormStatus } from '@/types/types';
import WithConfirmOption from '@/components/WithConfirmOption';

type BanMemberOptionProps = {
    reportId: string,
    reportedMemberId: string,
    contentType: "photo" | "message",
    contentData: Photo | Message,
    banReason: string
}

function BanMemberOption({ reportId, reportedMemberId, contentType, contentData, banReason }: BanMemberOptionProps): JSX.Element {
    const banReportedMember: (prevState: FormStatus) => Promise<FormStatus> = banReportedMemberAction.bind(null, reportId, reportedMemberId, contentType, contentData, banReason);

    return (
        <WithConfirmOption
            action={banReportedMember}
            buttonLabel="Ban Member"
            pendingLabel="Wait..."
            buttonCss="capitalize text-sm font-semibold rounded-md w-28 h-9 text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer"
        />
    )
}

export default BanMemberOption