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
