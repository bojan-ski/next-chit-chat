import { JSX } from 'react';
import { fetchReportedContentAction } from '@/actions/reportActions';
import { notFound } from 'next/navigation';
import MemberDataWrapper from '@/components/admin/selectedReportPage/MemberDataWrapper';
import MemberProfileDetails from '@/components/MemberProfileDetails';
import ReportedContent from '@/components/admin/selectedReportPage/ReportedContent';
import MemberPreviousBans from '@/components/admin/selectedReportPage/MemberPreviousBans';

async function SelectedReportPage({ params }: { params: Promise<{ reportId: string }> }): Promise<JSX.Element> {
  const { reportId } = await params;

  const data = await fetchReportedContentAction(reportId);

  if (!data) return notFound();

  const { report, reporterBans, reportedMemberBans } = data;

  return (
    <section className="selected-report-page max-w-7xl mx-auto">

      {/* Reported Member */}
      <MemberDataWrapper
        label='Reported Member'
        wrapperCss="grid lg:grid-cols-3 gap-5"
      >
        <MemberProfileDetails
          memberData={report.reportedMember}
          sectionCss='member-profile-details border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]'
          allowChitChat={false}
        />
        <ReportedContent report={report} />
        <MemberPreviousBans bans={reportedMemberBans} />
      </MemberDataWrapper>

      {/* Reporter Member */}
      <MemberDataWrapper
        label='Reporter'
        wrapperCss="grid lg:grid-cols-12 gap-5"
      >
        <div className='lg:col-span-4'>
          <MemberProfileDetails
            memberData={report.reporter}
            sectionCss='member-profile-details border border-[#E5C6AC] rounded-lg p-5 bg-[#FFF9F5]'
            allowChitChat={false}
          />
        </div>

        <div className='lg:col-span-8'>
          <MemberPreviousBans bans={reporterBans} />
        </div>
      </MemberDataWrapper>
    </section>
  );
}

export default SelectedReportPage;
