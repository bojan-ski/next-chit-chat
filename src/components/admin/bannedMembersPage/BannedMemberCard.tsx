import { JSX } from 'react';
import { BannedMemberWithDetails } from '@/types/types';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import MemberCardProfileDetails from '@/components/MemberCardProfileDetails';
import MemberPreviousBans from '../MemberPreviousBans';

function BannedMemberCard({ bannedMember }: { bannedMember: BannedMemberWithDetails }): JSX.Element {
    return (
        <Dialog>

            <DialogTrigger asChild>
                <MemberCardProfileDetails member={bannedMember.member} />
            </DialogTrigger>

            <DialogContent className="max-w-4xl bg-white p-8 text-[#C05C41]">
                <VisuallyHidden>
                    <DialogTitle>
                        Member bans
                    </DialogTitle>
                </VisuallyHidden>

                <MemberPreviousBans bans={bannedMember.bans} />
            </DialogContent>

        </Dialog>
    )
}

export default BannedMemberCard