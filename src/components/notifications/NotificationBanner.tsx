"use client";

import type { DueNotification } from "@/lib/notification-service";
import Button from "@/components/ui/Button";

interface NotificationBannerProps {
  reminders: DueNotification[];
  onDismiss: (id: string) => void;
}

export default function NotificationBanner({
  reminders,
  onDismiss,
}: NotificationBannerProps) {
  if (reminders.length === 0) return null;

  return (
    <div className="space-y-2">
      {reminders.map(({ record, message }) => (
        <div
          key={record.id}
          role="alert"
          className="flex items-start justify-between gap-3 px-4 py-3 rounded-xl
            bg-amber-50 dark:bg-amber-900/20
            border border-amber-200 dark:border-amber-700
            text-amber-800 dark:text-amber-200"
        >
          <div className="flex items-start gap-2">
            <span className="text-base mt-0.5" aria-hidden>🔔</span>
            <p className="text-sm leading-snug">{message}</p>
          </div>
          <button
            onClick={() => onDismiss(record.id)}
            aria-label="Dismiss"
            className="flex-shrink-0 text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
