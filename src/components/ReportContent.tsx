import { JSX } from 'react'
import { submitReportAction } from '@/actions/reportActions';
import { FormStatus } from '@/types/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormTextarea from './FormTextarea';
import FormWrapper from './FormWrapper';
import { MdOutlineReport } from "react-icons/md";

type ReportContentProps = {
    contentType: string
    contentId: string;
    contentOwnerId: string;
}

function ReportContent({ contentType, contentId, contentOwnerId }: ReportContentProps): JSX.Element {
    const submitReport: (prevState: FormStatus, formData: FormData) => Promise<FormStatus | void> = submitReportAction.bind(null, contentType, contentId, contentOwnerId);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer border-0 hover:text-red-900'>
                    <MdOutlineReport />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-white border-0">
                <DialogHeader>
                    <DialogTitle className='text-center text-[#7B4B3A]'>
                        Report Content
                    </DialogTitle>
                </DialogHeader>

                <FormWrapper
                    action={submitReport}
                    buttonLabel='Submit'
                    pendingLabel='Submitting...'
                >
                    <FormTextarea
                        name='report'
                        placeholder='Please provide a detailed reason'
                        required={true}
                    />
                </FormWrapper>
            </DialogContent>
        </Dialog>
    )
}

export default ReportContent