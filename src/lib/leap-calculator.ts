import { addDays, differenceInDays, isWithinInterval } from "date-fns";
import { LEAP_DEFINITIONS } from "@/data/leap-data";
import type { ComputedLeap, LeapDefinition, LeapStatus } from "@/types";

const WEEKS_TO_DAYS = 7;

/**
 * Convert a week offset from EDD into an absolute Date.
 */
export function weeksFromEDD(edd: Date, weeks: number): Date {
  const days = Math.round(weeks * WEEKS_TO_DAYS);
  return addDays(edd, days);
}

/**
 * Determine the status of a leap relative to today.
 */
export function resolveLeapStatus(
  startDate: Date,
  endDate: Date,
  today: Date = new Date()
): LeapStatus {
  const todayMidnight = startOfDay(today);

  if (endDate < todayMidnight) return "completed";

  if (
    isWithinInterval(todayMidnight, {
      start: startOfDay(startDate),
      end: endOfDay(endDate),
    })
  )
    return "active";

  const daysUntil = differenceInDays(startDate, todayMidnight);
  if (daysUntil <= 30) return "upcoming";

  return "future";
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

/**
 * Compute a single leap from its definition + EDD.
 */
export function computeLeap(
  definition: LeapDefinition,
  edd: Date,
  today: Date = new Date()
): ComputedLeap {
  const startDate = weeksFromEDD(edd, definition.startWeek);
  const endDate = weeksFromEDD(edd, definition.endWeek);
  const todayMidnight = startOfDay(today);
  const status = resolveLeapStatus(startDate, endDate, today);

  const daysUntilStart =
    startDate > todayMidnight
      ? differenceInDays(startOfDay(startDate), todayMidnight)
      : null;

  const daysUntilEnd =
    endDate >= todayMidnight && status !== "completed"
      ? differenceInDays(startOfDay(endDate), todayMidnight)
      : null;

  const daysActive =
    status === "active"
      ? differenceInDays(todayMidnight, startOfDay(startDate))
      : null;

  return {
    definition,
    startDate,
    endDate,
    status,
    daysUntilStart,
    daysUntilEnd,
    daysActive,
  };
}

/**
 * Compute all 10 leaps from an EDD.
 */
export function computeAllLeaps(
  edd: Date,
  today: Date = new Date()
): ComputedLeap[] {
  return LEAP_DEFINITIONS.map((def) => computeLeap(def, edd, today));
}

/**
 * Find the currently active leap, if any.
 */
export function findActiveLeap(leaps: ComputedLeap[]): ComputedLeap | null {
  return leaps.find((l) => l.status === "active") ?? null;
}

/**
 * Find the next upcoming leap (soonest start date in the future).
 */
export function findNextLeap(leaps: ComputedLeap[]): ComputedLeap | null {
  const upcoming = leaps.filter(
    (l) => l.status === "upcoming" || l.status === "future"
  );
  if (upcoming.length === 0) return null;
  return upcoming.reduce((closest, leap) =>
    (leap.daysUntilStart ?? Infinity) < (closest.daysUntilStart ?? Infinity)
      ? leap
      : closest
  );
}

/**
 * Produce a human-readable current status message.
 */
export function describeCurrentStatus(
  activeLeap: ComputedLeap | null,
  nextLeap: ComputedLeap | null
): string {
  if (activeLeap) {
    return `Currently in Leap ${activeLeap.definition.number}: ${activeLeap.definition.name}`;
  }
  if (nextLeap && nextLeap.daysUntilStart !== null) {
    const d = nextLeap.daysUntilStart;
    return `Leap ${nextLeap.definition.number} starts in ${d} day${d !== 1 ? "s" : ""}`;
  }
  return "All leaps complete — well done!";
}
