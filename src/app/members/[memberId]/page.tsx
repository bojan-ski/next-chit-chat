import { JSX } from 'react';
import { getSelectedMemberDataAction } from '@/actions/memberProfileActions';

async function SelectedMemberPage({ params }: { params: Promise<{ memberID: string }> }): Promise<JSX.Element> {
  const { memberID } = await params;
  const memberData = await getSelectedMemberDataAction(memberID);
  console.log(memberData);  

  return (
    <div>SelectedMemberPage</div>
  )
}

export default SelectedMemberPage