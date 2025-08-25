import { JSX } from 'react';
import { Message, Photo } from '@prisma/client';
import { formatTime } from '@/utils/utils';
import PhotoModal from '@/components/PhotoModal';

type ReportedContentProps = {
  report: {
    contentType: string;
    message?: Message | null;
    photo?: Photo | null;
  };
};

function ReportedContent({ report }: ReportedContentProps): JSX.Element {
  return (
    <>
      {report.contentType === 'message' && report.message ? (
        <div className="reported-message h-[200px] lg:h-full border border-[#E5C6AC] rounded-lg p-5">
          <p className="text-sm">
            {report.message.content}
          </p>
          <p className="text-xs mb-3 mt-1 text-[#A67C65]">
            {formatTime(report.message.createdAt)}
          </p>
        </div>
      ) : report.photo ? (
        <div className='reported-photo h-[600px] lg:h-full border border-[#E5C6AC] rounded-lg p-5'>
          <PhotoModal
            photo={report.photo}
            height='h-full'
            allowDelete={false}
          />
        </div>
      ) : (
        <div className='h-[200px] lg:h-full border border-[#E5C6AC] rounded-lg p-5'>
          <p className="text-center text-[#A67C65]">
            No content found
          </p>
        </div>
      )}
    </>
  );
}

export default ReportedContent;
