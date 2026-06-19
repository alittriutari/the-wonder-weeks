import { calculateAge, isValidEDD, parseEDDString, formatAge } from "@/lib/age-calculator";

describe("parseEDDString", () => {
  it("parses a valid ISO date string", () => {
    const d = parseEDDString("2024-03-15");
    expect(d.getFullYear()).toBe(2024);
    expect(d.getMonth()).toBe(2); // 0-indexed
    expect(d.getDate()).toBe(15);
  });
});

describe("calculateAge", () => {
  it("returns 0 days when edd equals today", () => {
    const today = new Date(2024, 5, 1);
    const age = calculateAge(today, today);
    expect(age.totalDays).toBe(0);
    expect(age.weeks).toBe(0);
    expect(age.remainingDays).toBe(0);
    expect(age.approximateMonths).toBe(0);
  });

  it("calculates 14 days as 2 weeks 0 days", () => {
    const edd = new Date(2024, 0, 1);
    const today = new Date(2024, 0, 15);
    const age = calculateAge(edd, today);
    expect(age.totalDays).toBe(14);
    expect(age.weeks).toBe(2);
    expect(age.remainingDays).toBe(0);
  });

  it("calculates 100 days correctly", () => {
    const edd = new Date(2024, 0, 1);
    const today = new Date(2024, 0, 101); // exactly 100 days later
    const age = calculateAge(edd, today);
    expect(age.totalDays).toBe(100);
    expect(age.weeks).toBe(14);
    expect(age.remainingDays).toBe(2);
    expect(age.approximateMonths).toBe(3);
  });
});

describe("isValidEDD", () => {
  const today = new Date(2024, 5, 15);

  it("returns true for a date 10 weeks ago", () => {
    const edd = new Date(2024, 3, 6); // ~10 weeks before today
    expect(isValidEDD(edd, today)).toBe(true);
  });

  it("returns false for a future date", () => {
    const future = new Date(2025, 0, 1);
    expect(isValidEDD(future, today)).toBe(false);
  });

  it("returns false for a date more than 2 years ago", () => {
    const old = new Date(2021, 0, 1);
    expect(isValidEDD(old, today)).toBe(false);
  });

  it("returns true for today exactly", () => {
    expect(isValidEDD(today, today)).toBe(true);
  });
});

describe("formatAge", () => {
  it("includes weeks and days", () => {
    const result = formatAge({
      totalDays: 50,
      weeks: 7,
      remainingDays: 1,
      approximateMonths: 1,
    });
    expect(result).toContain("7 weeks");
    expect(result).toContain("50 days");
    expect(result).toContain("1 month");
  });
});
