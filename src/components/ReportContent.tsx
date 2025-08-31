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
    contentType: 'message' | 'photo';
    messageId?: string;
    photoId?: string;
    contentOwnerId: string;
}

function ReportContent({ contentType, messageId, photoId, contentOwnerId }: ReportContentProps): JSX.Element {
    const submitReport: (prevState: FormStatus, formData: FormData) => Promise<FormStatus | void> = submitReportAction.bind(null, contentType, messageId ?? null, photoId ?? null, contentOwnerId);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer hover:text-red-900'>
                    <MdOutlineReport />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-white border-0" aria-describedby={undefined}>
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
                        minLength={1}
                        maxLength={200}
                        required={true}
                    />
                </FormWrapper>
            </DialogContent>
        </Dialog>
    )
}

export default ReportContent