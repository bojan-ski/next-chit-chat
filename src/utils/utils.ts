import { differenceInYears, format } from "date-fns";

export function calculateMemberAge(dob: Date): number {
  return differenceInYears(new Date(), dob);
}

export function formatDateForInput(
  date: Date | string | null | undefined
): string {
  if (!date) return "";

  return format(new Date(date), "yyyy-MM-dd");
}

export const formatTime = (date: Date) => {
  return format(new Date(date), "hh:mm a");
};
