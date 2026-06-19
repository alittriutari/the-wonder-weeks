import { addDays, differenceInDays, isSameDay } from "date-fns";
import type {
  ComputedLeap,
  NotificationRecord,
  NotificationState,
  NotificationTrigger,
} from "@/types";
import { getNotificationState, saveNotificationState } from "./storage";

// ─── Permission ───────────────────────────────────────────────────────────────

export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  const result = await Notification.requestPermission();
  const state = getNotificationState();
  saveNotificationState({ ...state, permission: result });
  return result;
}

// ─── Record management ────────────────────────────────────────────────────────

function makeRecordId(leapNumber: number, trigger: NotificationTrigger): string {
  return `leap-${leapNumber}-${trigger}`;
}

function getScheduledDate(
  leap: ComputedLeap,
  trigger: NotificationTrigger
): Date {
  switch (trigger) {
    case "leap_start_minus_3":
      return addDays(leap.startDate, -3);
    case "leap_start":
      return leap.startDate;
    case "leap_end_minus_2":
      return addDays(leap.endDate, -2);
  }
}

/**
 * Build the full expected notification schedule from computed leaps.
 * Skips notifications whose scheduled date is already in the past (completed leaps).
 */
export function buildNotificationSchedule(
  leaps: ComputedLeap[],
  today: Date = new Date()
): NotificationRecord[] {
  const records: NotificationRecord[] = [];

  for (const leap of leaps) {
    if (leap.status === "completed") continue;

    const triggers: NotificationTrigger[] = [
      "leap_start_minus_3",
      "leap_start",
      "leap_end_minus_2",
    ];

    for (const trigger of triggers) {
      const scheduledDate = getScheduledDate(leap, trigger);
      records.push({
        id: makeRecordId(leap.definition.number, trigger),
        leapNumber: leap.definition.number,
        trigger,
        scheduledDate: scheduledDate.toISOString(),
        delivered: false,
      });
    }
  }

  return records;
}

/**
 * Merge a fresh schedule with existing delivery records so we don't lose
 * history of already-delivered notifications.
 */
export function mergeSchedule(
  existing: NotificationRecord[],
  fresh: NotificationRecord[]
): NotificationRecord[] {
  const existingMap = new Map(existing.map((r) => [r.id, r]));
  return fresh.map((record) => existingMap.get(record.id) ?? record);
}

// ─── Due-today check & in-app missed reminders ────────────────────────────────

export interface DueNotification {
  record: NotificationRecord;
  leap: ComputedLeap;
  message: string;
}

function buildMessage(record: NotificationRecord, leap: ComputedLeap): string {
  switch (record.trigger) {
    case "leap_start_minus_3":
      return `Leap ${leap.definition.number} — "${leap.definition.name}" starts in 3 days.`;
    case "leap_start":
      return `Leap ${leap.definition.number} — "${leap.definition.name}" starts today!`;
    case "leap_end_minus_2":
      return `Leap ${leap.definition.number} ends in 2 days. Things may settle soon.`;
  }
}

/**
 * Returns all notifications that are due today and haven't been delivered yet.
 * This handles the "browser was closed" case — run on app launch.
 */
export function findDueNotifications(
  records: NotificationRecord[],
  leaps: ComputedLeap[],
  today: Date = new Date()
): DueNotification[] {
  const leapMap = new Map(leaps.map((l) => [l.definition.number, l]));
  const due: DueNotification[] = [];

  for (const record of records) {
    if (record.delivered) continue;
    const scheduled = new Date(record.scheduledDate);
    // Due if today >= scheduled date (catches missed days too)
    if (differenceInDays(today, scheduled) >= 0) {
      const leap = leapMap.get(record.leapNumber);
      if (leap) {
        due.push({ record, leap, message: buildMessage(record, leap) });
      }
    }
  }

  return due;
}

/**
 * Fire a browser notification and mark the record as delivered.
 */
export function deliverBrowserNotification(
  due: DueNotification
): NotificationRecord {
  if (
    isNotificationSupported() &&
    Notification.permission === "granted"
  ) {
    new Notification("Wonder Weeks", {
      body: due.message,
      icon: "/icon-192.png",
      tag: due.record.id,
    });
  }

  return {
    ...due.record,
    delivered: true,
    deliveredAt: new Date().toISOString(),
  };
}

/**
 * Process all due notifications: fire browser notifications and persist records.
 * Returns the list of in-app reminders (missed ones) to display.
 */
export function processDueNotifications(
  leaps: ComputedLeap[],
  today: Date = new Date()
): DueNotification[] {
  const state = getNotificationState();
  const fresh = buildNotificationSchedule(leaps, today);
  const merged = mergeSchedule(state.records, fresh);
  const due = findDueNotifications(merged, leaps, today);

  if (due.length === 0) return [];

  const updatedRecords = merged.map((record) => {
    const dueItem = due.find((d) => d.record.id === record.id);
    if (!dueItem) return record;
    return deliverBrowserNotification(dueItem);
  });

  saveNotificationState({ ...state, records: updatedRecords });
  return due;
}
