import { JSX } from 'react';
import { rejectReportAction } from '@/actions/reportActions';
import { FormStatus } from '@/types/types';
import WithConfirmOption from '@/components/WithConfirmOption';

function RejectReportOption({ reportId }: { reportId: string }): JSX.Element {
    const rejectReported: (prevState: FormStatus) => Promise<FormStatus> = rejectReportAction.bind(null, reportId,);

    return (
        <WithConfirmOption
            action={rejectReported}
            buttonLabel="Reject"
            pendingLabel="Wait..."
            buttonCss="capitalize text-sm font-semibold rounded-md w-28 h-9 text-[#7B4B3A] border border-[#E5C6AC] hover:bg-[#C05C41] hover:text-white cursor-pointer"
        />
    )
}

export default RejectReportOption