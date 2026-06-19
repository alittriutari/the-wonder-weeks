"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isNotificationSupported,
  processDueNotifications,
  requestNotificationPermission,
  type DueNotification,
} from "@/lib/notification-service";
import { getNotificationState } from "@/lib/storage";
import type { ComputedLeap } from "@/types";

interface UseNotificationsReturn {
  permission: NotificationPermission | "unsupported";
  missedReminders: DueNotification[];
  requestPermission: () => Promise<void>;
  dismissReminder: (id: string) => void;
}

export function useNotifications(leaps: ComputedLeap[]): UseNotificationsReturn {
  const [permission, setPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const [missedReminders, setMissedReminders] = useState<DueNotification[]>([]);

  // Restore permission state and process due notifications on mount
  useEffect(() => {
    if (!isNotificationSupported()) {
      setPermission("unsupported");
      return;
    }

    const stored = getNotificationState();
    setPermission(
      stored.permission !== "unsupported"
        ? (Notification.permission as NotificationPermission)
        : "unsupported"
    );

    if (leaps.length === 0) return;

    const due = processDueNotifications(leaps);
    // Show in-app reminders for missed ones (browser was closed)
    setMissedReminders(due);
  }, [leaps]);

  const requestPermission = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
  }, []);

  const dismissReminder = useCallback((id: string) => {
    setMissedReminders((prev) => prev.filter((r) => r.record.id !== id));
  }, []);

  return { permission, missedReminders, requestPermission, dismissReminder };
}
