// ─── Core domain types ────────────────────────────────────────────────────────

export interface LeapDefinition {
  number: number;
  name: string;
  /** weeks from EDD when the leap window opens */
  startWeek: number;
  /** weeks from EDD when the leap window closes */
  endWeek: number;
  description: string;
  skills: string[];
}

export type LeapStatus = "completed" | "active" | "upcoming" | "future";

export interface ComputedLeap {
  definition: LeapDefinition;
  startDate: Date;
  endDate: Date;
  status: LeapStatus;
  daysUntilStart: number | null; // null if already started
  daysUntilEnd: number | null;   // null if already ended
  daysActive: number | null;     // null if not yet active
}

// ─── Observation types ────────────────────────────────────────────────────────

export interface LeapObservation {
  leapNumber: number;
  /** Observations commonly reported in the days/weeks BEFORE the leap window opens */
  before: string[];
  /** Observations commonly reported DURING the leap window */
  during: string[];
  /** Optional contextual note specific to this leap */
  note?: string;
}

// ─── Baby / profile types (extensible for multiple babies) ───────────────────

export interface BabyProfile {
  id: string;
  edd: string; // ISO date string
  name?: string;
  createdAt: string;
}

// ─── Age types ────────────────────────────────────────────────────────────────

export interface BabyAge {
  totalDays: number;
  weeks: number;
  remainingDays: number;
  approximateMonths: number;
}

// ─── Notification types ───────────────────────────────────────────────────────

export type NotificationTrigger =
  | "leap_start_minus_3"
  | "leap_start"
  | "leap_end_minus_2";

export interface NotificationRecord {
  id: string;
  leapNumber: number;
  trigger: NotificationTrigger;
  scheduledDate: string; // ISO date string
  delivered: boolean;
  deliveredAt?: string;
}

export interface NotificationState {
  permission: NotificationPermission | "unsupported";
  records: NotificationRecord[];
}

// ─── Storage schema ───────────────────────────────────────────────────────────

export interface StorageSchema {
  baby_profile: BabyProfile | null;
  notification_state: NotificationState;
}
