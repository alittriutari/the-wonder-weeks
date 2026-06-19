import {
  buildNotificationSchedule,
  mergeSchedule,
  findDueNotifications,
} from "@/lib/notification-service";
import { computeAllLeaps } from "@/lib/leap-calculator";
import { addDays } from "date-fns";
import type { NotificationRecord } from "@/types";

const EDD = new Date(2024, 0, 1);

describe("buildNotificationSchedule", () => {
  it("produces 3 records per non-completed leap", () => {
    const today = addDays(EDD, 5); // before most leaps
    const leaps = computeAllLeaps(EDD, today);
    const schedule = buildNotificationSchedule(leaps, today);
    // Each upcoming/future/active leap gets 3 triggers
    const nonCompleted = leaps.filter((l) => l.status !== "completed");
    expect(schedule.length).toBe(nonCompleted.length * 3);
  });

  it("skips completed leaps", () => {
    const afterAll = addDays(EDD, 600);
    const leaps = computeAllLeaps(EDD, afterAll);
    const schedule = buildNotificationSchedule(leaps, afterAll);
    expect(schedule.length).toBe(0);
  });

  it("generates correct trigger types", () => {
    const today = addDays(EDD, 5);
    const leaps = computeAllLeaps(EDD, today);
    const schedule = buildNotificationSchedule(leaps, today);
    const triggers = schedule.map((r) => r.trigger);
    expect(triggers).toContain("leap_start_minus_3");
    expect(triggers).toContain("leap_start");
    expect(triggers).toContain("leap_end_minus_2");
  });
});

describe("mergeSchedule", () => {
  it("preserves delivered state from existing records", () => {
    const today = addDays(EDD, 5);
    const leaps = computeAllLeaps(EDD, today);
    const fresh = buildNotificationSchedule(leaps, today);
    const delivered: NotificationRecord = {
      ...fresh[0],
      delivered: true,
      deliveredAt: new Date().toISOString(),
    };
    const existing = [delivered];
    const merged = mergeSchedule(existing, fresh);
    const found = merged.find((r) => r.id === fresh[0].id);
    expect(found?.delivered).toBe(true);
  });

  it("keeps new records not in existing", () => {
    const today = addDays(EDD, 5);
    const leaps = computeAllLeaps(EDD, today);
    const fresh = buildNotificationSchedule(leaps, today);
    const merged = mergeSchedule([], fresh);
    expect(merged.length).toBe(fresh.length);
    merged.forEach((r) => expect(r.delivered).toBe(false));
  });
});

describe("findDueNotifications", () => {
  it("finds notifications scheduled for today or earlier", () => {
    const today = addDays(EDD, 33); // inside leap 1
    const leaps = computeAllLeaps(EDD, today);
    const schedule = buildNotificationSchedule(leaps, today);
    const due = findDueNotifications(schedule, leaps, today);
    // Should at minimum have leap 1 start notification due
    expect(due.length).toBeGreaterThanOrEqual(1);
  });

  it("skips already-delivered records", () => {
    const today = addDays(EDD, 33);
    const leaps = computeAllLeaps(EDD, today);
    const schedule = buildNotificationSchedule(leaps, today).map((r) => ({
      ...r,
      delivered: true,
    }));
    const due = findDueNotifications(schedule, leaps, today);
    expect(due.length).toBe(0);
  });

  it("returns empty when no notifications are due yet", () => {
    const today = addDays(EDD, 0); // day 0, before any leap
    const leaps = computeAllLeaps(EDD, today);
    const schedule = buildNotificationSchedule(leaps, today);
    // Filter to only future records
    const future = schedule.map((r) => ({
      ...r,
      scheduledDate: addDays(today, 30).toISOString(),
    }));
    const due = findDueNotifications(future, leaps, today);
    expect(due.length).toBe(0);
  });
});
