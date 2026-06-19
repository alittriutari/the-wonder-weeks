import { differenceInDays } from "date-fns";
import type { BabyAge } from "@/types";

/**
 * Calculate baby's age from their Estimated Due Date (EDD).
 * EDD is used (not birth date) per Wonder Weeks methodology.
 */
export function calculateAge(edd: Date, today: Date = new Date()): BabyAge {
  const totalDays = differenceInDays(today, edd);
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const approximateMonths = Math.floor(totalDays / 30.44);

  return {
    totalDays,
    weeks,
    remainingDays,
    approximateMonths,
  };
}

/**
 * Format age into a human-readable string.
 */
export function formatAge(age: BabyAge): string {
  const parts: string[] = [];

  if (age.approximateMonths >= 1) {
    parts.push(
      `${age.approximateMonths} month${age.approximateMonths !== 1 ? "s" : ""}`
    );
  }

  parts.push(`${age.weeks} week${age.weeks !== 1 ? "s" : ""}`);
  parts.push(`${age.totalDays} day${age.totalDays !== 1 ? "s" : ""}`);

  return parts.join(" · ");
}

/**
 * Returns true if the EDD is valid for calculations:
 * - Must be a real date
 * - Cannot be in the future (baby must have been due already)
 * - Cannot be more than ~2 years in the past (beyond all leaps)
 */
export function isValidEDD(edd: Date, today: Date = new Date()): boolean {
  if (isNaN(edd.getTime())) return false;
  const days = differenceInDays(today, edd);
  return days >= 0 && days <= 730; // 0 to ~2 years
}

/**
 * Parse an ISO date string to a Date (midnight UTC to avoid timezone shifts).
 */
export function parseEDDString(isoString: string): Date {
  const [year, month, day] = isoString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
