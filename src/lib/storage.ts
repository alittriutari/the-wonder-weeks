import type { BabyProfile, NotificationState, StorageSchema } from "@/types";

const KEYS = {
  BABY_PROFILE: "ww_baby_profile",
  NOTIFICATION_STATE: "ww_notification_state",
} as const;

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or private browsing restriction — fail silently
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// ─── Baby profile ─────────────────────────────────────────────────────────────

export function getBabyProfile(): BabyProfile | null {
  return safeGet<BabyProfile>(KEYS.BABY_PROFILE);
}

export function saveBabyProfile(profile: BabyProfile): void {
  safeSet(KEYS.BABY_PROFILE, profile);
}

export function clearBabyProfile(): void {
  safeRemove(KEYS.BABY_PROFILE);
}

// ─── Notification state ───────────────────────────────────────────────────────

const DEFAULT_NOTIFICATION_STATE: NotificationState = {
  permission: "default",
  records: [],
};

export function getNotificationState(): NotificationState {
  return (
    safeGet<NotificationState>(KEYS.NOTIFICATION_STATE) ??
    DEFAULT_NOTIFICATION_STATE
  );
}

export function saveNotificationState(state: NotificationState): void {
  safeSet(KEYS.NOTIFICATION_STATE, state);
}

// ─── Full schema export for debugging ────────────────────────────────────────

export function exportStorageSnapshot(): StorageSchema {
  return {
    baby_profile: getBabyProfile(),
    notification_state: getNotificationState(),
  };
}

export function clearAllStorage(): void {
  safeRemove(KEYS.BABY_PROFILE);
  safeRemove(KEYS.NOTIFICATION_STATE);
}

export function parseEDDString(isoDate: string): Date {
  // "2026-04-16" → split manually to avoid UTC midnight trap on mobile Safari
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight, not UTC
}
