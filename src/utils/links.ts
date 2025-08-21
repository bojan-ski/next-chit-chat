import { NavigationLink } from "../types/types";

export const memberNavigationLinks: NavigationLink[] = [
  { href: "/suggestions", label: "suggestions" },
  { href: "/members", label: "members" },
  { href: "/likes", label: "likes" },
  { href: "/conversation", label: "conversation" },
  { href: "/profile-details", label: "profile details" },
];

export const adminNavigationLinks: NavigationLink[] = [
  { href: "/forbidden-words", label: "forbidden words" },
  { href: "/all-conversations", label: "all conversations" },
  { href: "/all-photos", label: "all photos" },
];
