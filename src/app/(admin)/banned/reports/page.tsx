import { JSX } from 'react';
import { fetchReportedMembersAction } from '@/actions/reportActions';
import { ReportWithMembers } from '@/types/types';
import NoDataMessage from '@/components/NoDataMessage';
import ReportCard from '@/components/admin/reportsPage/ReportCard';

async function ReportsPage(): Promise<JSX.Element> {
  const reportedMembers: ReportWithMembers[] = await fetchReportedMembersAction();

  return (
    <section className='reports-page max-w-7xl mx-auto'>
      {reportedMembers.length == 0 ? (
        <NoDataMessage message="There are no reported members" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {reportedMembers.map(report => <ReportCard key={report.id} report={report} />)}
        </div>
      )}
    </section>
  )
}

export default ReportsPage