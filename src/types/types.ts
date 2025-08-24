import { Member, Message, Report } from "@prisma/client";

export type NavigationLink = {
  href: string;
  label: string;
};

export type FormStatus = {
  status: "error" | "success" | "";
  message: string;
};

export type PageNavigationLink = {
  link: string;
  label: string;
};

export type MemberFilters = {
  gender?: "male" | "female" | "all";
  minAge?: number;
  maxAge?: number;
};

export type MembersSearchParams = {
  gender?: string;
  minAge?: string;
  maxAge?: string;
};

export type ConversationAndParticipants = {
  id: string;
  participantOneId: string;
  participantTwoId: string;
  createdAt: Date;
  updatedAt: Date;

  participantOne: {
    id: string;
    username: string;
    profileImage: string;
  };

  participantTwo: {
    id: string;
    username: string;
    profileImage: string;
  };
};

export type ConversationAndMessages = ConversationAndParticipants & {
  messages: Message[];
};

export type ReportWithMembers = Report & {
  reportedMember: Member;
  reporter: Member;
};
