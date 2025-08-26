import { JSX, ReactNode } from 'react';
import RejectReportOption from './RejectReportOption';
import BanMemberOption from './BanMemberOption';

type MemberDataWrapperProps = {
    label: string;
    wrapperCss: string;
    report: any
    children: ReactNode;
}

function MemberDataWrapper({ label, wrapperCss, report, children }: MemberDataWrapperProps): JSX.Element {    
    return (
        <div className='reported-member-data mb-10'>
            <div className='flex flex-col md:flex-row items-center justify-between mb-8'>
                <h2 className="font-bold text-3xl text-[#7B4B3A] mb-5 md:mb-0">
                    {label}
                </h2>

                <div className='flex gap-1'>
                    {label == 'Reported Member' && <RejectReportOption reportId={report.id} />}

                    <BanMemberOption
                        reportId={report.id}
                        reportedMemberId={report.contentOwnerId}
                        contentType={report.contentType}
                        contentData={report.contentType == 'message' ? report.message : report.photo}
                        banReason={label == 'Reported Member' ? report.report : 'False report'}
                    />
                </div>
            </div>

            <div className={wrapperCss}>
                {children}
            </div>
        </div>
    )
}

export default MemberDataWrapper