"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export function useNotifications(
  leaps: ComputedLeap[],
): UseNotificationsReturn {
  const [permission, setPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const [missedReminders, setMissedReminders] = useState<DueNotification[]>([]);

  // Stable key derived from leap IDs — only changes when the leap list actually changes
  const leapsKey = leaps.map((l) => l.definition.number).join(",");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isNotificationSupported()) {
      setPermission("unsupported");
      return;
    }

    const stored = getNotificationState();
    setPermission(
      stored.permission !== "unsupported"
        ? (Notification.permission as NotificationPermission)
        : "unsupported",
    );

    if (leaps.length === 0) return;

    // Only process due notifications once leaps are loaded and on meaningful changes
    if (!initializedRef.current || leapsKey) {
      initializedRef.current = true;
      const due = processDueNotifications(leaps);
      setMissedReminders(due);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leapsKey]);

  const requestPermission = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
  }, []);

  const dismissReminder = useCallback((id: string) => {
    setMissedReminders((prev) => prev.filter((r) => r.record.id !== id));
  }, []);

  return { permission, missedReminders, requestPermission, dismissReminder };
}
