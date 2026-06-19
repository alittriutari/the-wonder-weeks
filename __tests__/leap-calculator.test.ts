import {
  computeLeap,
  computeAllLeaps,
  findActiveLeap,
  findNextLeap,
  resolveLeapStatus,
  weeksFromEDD,
  describeCurrentStatus,
} from "@/lib/leap-calculator";
import { LEAP_DEFINITIONS } from "@/data/leap-data";
import { addDays } from "date-fns";

const EDD = new Date(2024, 0, 1); // Jan 1, 2024

describe("weeksFromEDD", () => {
  it("converts 4.5 weeks to 32 days from EDD", () => {
    const result = weeksFromEDD(EDD, 4.5);
    const expected = addDays(EDD, 32);
    expect(result.toDateString()).toBe(expected.toDateString());
  });
});

describe("resolveLeapStatus", () => {
  it("returns 'completed' when end date is in the past", () => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2023, 0, 10);
    const today = new Date(2024, 0, 1);
    expect(resolveLeapStatus(start, end, today)).toBe("completed");
  });

  it("returns 'active' when today is within the leap window", () => {
    const today = new Date(2024, 5, 15);
    const start = new Date(2024, 5, 10);
    const end = new Date(2024, 5, 20);
    expect(resolveLeapStatus(start, end, today)).toBe("active");
  });

  it("returns 'upcoming' when start is within 30 days", () => {
    const today = new Date(2024, 5, 1);
    const start = new Date(2024, 5, 20);
    const end = new Date(2024, 6, 5);
    expect(resolveLeapStatus(start, end, today)).toBe("upcoming");
  });

  it("returns 'future' when start is more than 30 days away", () => {
    const today = new Date(2024, 0, 1);
    const start = new Date(2024, 3, 1); // ~90 days away
    const end = new Date(2024, 3, 15);
    expect(resolveLeapStatus(start, end, today)).toBe("future");
  });
});

describe("computeLeap", () => {
  it("produces a leap with correct dates from EDD", () => {
    const def = LEAP_DEFINITIONS[0]; // Leap 1, weeks 4.5–5.5
    const today = addDays(EDD, 35); // inside leap 1
    const leap = computeLeap(def, EDD, today);
    expect(leap.status).toBe("active");
    expect(leap.daysActive).not.toBeNull();
    expect(leap.daysUntilStart).toBeNull(); // already started
  });

  it("marks a past leap as completed", () => {
    const def = LEAP_DEFINITIONS[0];
    const today = addDays(EDD, 365); // long after
    const leap = computeLeap(def, EDD, today);
    expect(leap.status).toBe("completed");
    expect(leap.daysUntilEnd).toBeNull();
  });
});

describe("computeAllLeaps", () => {
  it("returns exactly 10 leaps", () => {
    const leaps = computeAllLeaps(EDD, EDD);
    expect(leaps).toHaveLength(10);
  });

  it("assigns leap numbers in order", () => {
    const leaps = computeAllLeaps(EDD, EDD);
    leaps.forEach((l, i) => {
      expect(l.definition.number).toBe(i + 1);
    });
  });
});

describe("findActiveLeap", () => {
  it("returns null when no leap is active", () => {
    const leaps = computeAllLeaps(EDD, EDD); // day 0 — before any leaps
    expect(findActiveLeap(leaps)).toBeNull();
  });

  it("returns the active leap when within a window", () => {
    const inLeap1 = addDays(EDD, 33); // week 4.7 — inside leap 1
    const leaps = computeAllLeaps(EDD, inLeap1);
    const active = findActiveLeap(leaps);
    expect(active?.definition.number).toBe(1);
  });
});

describe("findNextLeap", () => {
  it("returns the soonest future leap", () => {
    const beforeAny = addDays(EDD, 5); // before leap 1 starts
    const leaps = computeAllLeaps(EDD, beforeAny);
    const next = findNextLeap(leaps);
    expect(next?.definition.number).toBe(1);
  });

  it("returns null when all leaps are completed", () => {
    const afterAll = addDays(EDD, 600);
    const leaps = computeAllLeaps(EDD, afterAll);
    expect(findNextLeap(leaps)).toBeNull();
  });
});

describe("describeCurrentStatus", () => {
  it("describes active leap", () => {
    const inLeap1 = addDays(EDD, 33);
    const leaps = computeAllLeaps(EDD, inLeap1);
    const active = findActiveLeap(leaps);
    const next = findNextLeap(leaps);
    const msg = describeCurrentStatus(active, next);
    expect(msg).toContain("Leap 1");
  });

  it("describes all complete", () => {
    const msg = describeCurrentStatus(null, null);
    expect(msg).toContain("complete");
  });
});
