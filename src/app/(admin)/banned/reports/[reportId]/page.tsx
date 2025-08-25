import { JSX } from 'react';
import { fetchReportedContentAction } from '@/actions/reportActions';
import { notFound } from 'next/navigation';
import MemberDataWrapper from '@/components/admin/selectedReportPage/MemberDataWrapper';
import MemberProfile from '@/components/admin/selectedReportPage/MemberProfile';
import ReportedContent from '@/components/admin/selectedReportPage/ReportedContent';
import MemberPreviousBans from '@/components/admin/selectedReportPage/MemberPreviousBans';

async function SelectedReportPage({ params }: { params: Promise<{ reportId: string }> }): Promise<JSX.Element> {
  const { reportId } = await params;

  const data = await fetchReportedContentAction(reportId);

  if (!data) return notFound();

  const { report, reporterBans, reportedMemberBans } = data;

  return (
    <div className="selected-report-page max-w-7xl mx-auto">

      {/* Reported Member */}
      <MemberDataWrapper
        label='Reported Member'
        wrapperCss="grid lg:grid-cols-3 gap-5"
      >
        <MemberProfile member={report.reportedMember} />
        <ReportedContent report={report} />
        <MemberPreviousBans bans={reportedMemberBans} />
      </MemberDataWrapper>

      {/* Reporter Member */}
      <MemberDataWrapper
        label='Reporter'
        wrapperCss="grid lg:grid-cols-12 gap-5"
      >
        <div className='lg:col-span-4'>
          <MemberProfile member={report.reporter} />
        </div>

        <div className='lg:col-span-8'>
          <MemberPreviousBans bans={reporterBans} />
        </div>
      </MemberDataWrapper>
    </div>
  );
}

export default SelectedReportPage;
