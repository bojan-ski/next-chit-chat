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
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
