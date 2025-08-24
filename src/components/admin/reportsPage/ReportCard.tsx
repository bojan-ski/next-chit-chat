import { JSX } from 'react';
import Link from 'next/link';
import { ReportWithMembers } from '@/types/types';
import ReportCardMemberData from './ReportCardMemberData';

function ReportCard({ report }: { report: ReportWithMembers }): JSX.Element {
    return (
        <Link
            href={`/banned/reports/${report.id}`}
            className="rounded-2xl border border-[#E5C6AC] bg-white p-5 shadow-sm hover:shadow-lg hover:border-[#C05C41] transition-all duration-200"
        >
            <div className="space-y-2.5">
                {/* report type */}
                <div className="flex justify-end">
                    <span className='text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-600 font-medium'>
                        {report.contentType}
                    </span>
                </div>

                {/* reported member */}
                <ReportCardMemberData
                    label='Reported member'
                    username={report.reportedMember.username}
                />

                {/* reported by */}
                <ReportCardMemberData
                    label='Reported by'
                    username={report.reporter.username}
                />

                {/* reason */}
                <div className="bg-[#FDF6F0] p-3 rounded-xl">
                    <p className="text-sm leading-relaxed line-clamp-3">
                        {report.report}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ReportCard