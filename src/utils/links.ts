import { NavigationLink } from "../types/types";

export const memberNavigationLinks: NavigationLink[] = [
  { href: "/matches", label: "matches" },
  { href: "/members", label: "members" },
  { href: "/likes", label: "likes" },
  { href: "/conversations", label: "conversations" },
  { href: "/profile-details", label: "profile details" },
];

export const adminNavigationLinks: NavigationLink[] = [
  { href: "/banned", label: "banned" },
  { href: "/forbidden-words", label: "forbidden words" },
  { href: "/all-conversations", label: "all conversations" },
  { href: "/all-photos", label: "all photos" },
];
