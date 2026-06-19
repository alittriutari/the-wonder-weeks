"use client";

import { useState } from "react";
import { format, isAfter, startOfDay } from "date-fns";
import { parseEDDString, isValidEDD } from "@/lib/age-calculator";
import { clearAllStorage } from "@/lib/storage";
import Button from "@/components/ui/Button";
import type { BabyProfile } from "@/types";

interface SettingsModalProps {
  profile: BabyProfile;
  notificationPermission: NotificationPermission | "unsupported";
  onUpdateEDD: (isoDate: string, name?: string) => void;
  onRequestNotifications: () => Promise<void>;
  onClose: () => void;
}

export default function SettingsModal({
  profile,
  notificationPermission,
  onUpdateEDD,
  onRequestNotifications,
  onClose,
}: SettingsModalProps) {
  const [eddValue, setEddValue] = useState(profile.edd);
  const [babyName, setBabyName] = useState(profile.name ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  function handleSave() {
    if (!eddValue) { setError("Please enter a due date."); return; }
    const parsed = parseEDDString(eddValue);
    if (isNaN(parsed.getTime())) { setError("Invalid date."); return; }
    if (isAfter(startOfDay(parsed), startOfDay(new Date()))) {
      setError("Due date cannot be in the future.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onUpdateEDD(eddValue, babyName.trim() || undefined);
      setSaving(false);
      onClose();
    }, 250);
  }

  function handleReset() {
    if (!confirmReset) { setConfirmReset(true); return; }
    clearAllStorage();
    window.location.reload();
  }

  const permissionLabel: Record<string, string> = {
    granted: "Enabled",
    denied: "Blocked by browser",
    default: "Not yet enabled",
    unsupported: "Not supported",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-sm rounded-2xl
          bg-white dark:bg-dusk-900
          border border-sage-200 dark:border-dusk-700
          shadow-xl p-6 space-y-5 animate-slide-up"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-sage-800 dark:text-dusk-100">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-sage-400 hover:text-sage-600 dark:text-dusk-500 dark:hover:text-dusk-300 transition-colors"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Baby name */}
        <div>
          <label className="block text-xs font-medium text-sage-600 dark:text-dusk-300 mb-1">
            Baby's name (optional)
          </label>
          <input
            type="text"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm
              bg-sage-50 dark:bg-dusk-800
              border border-sage-200 dark:border-dusk-600
              text-sage-900 dark:text-dusk-100
              focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-dusk-500"
          />
        </div>

        {/* EDD */}
        <div>
          <label className="block text-xs font-medium text-sage-600 dark:text-dusk-300 mb-1">
            Estimated Due Date (EDD)
          </label>
          <input
            type="date"
            value={eddValue}
            max={today}
            onChange={(e) => { setEddValue(e.target.value); setError(""); }}
            className="w-full px-3 py-2 rounded-xl text-sm
              bg-sage-50 dark:bg-dusk-800
              border border-sage-200 dark:border-dusk-600
              text-sage-900 dark:text-dusk-100
              focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-dusk-500
              [color-scheme:light] dark:[color-scheme:dark]"
          />
          {error && (
            <p role="alert" className="mt-1 text-xs text-coral-500">{error}</p>
          )}
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between py-2 border-t border-sage-100 dark:border-dusk-700">
          <div>
            <p className="text-sm font-medium text-sage-700 dark:text-dusk-200">Notifications</p>
            <p className="text-xs text-sage-400 dark:text-dusk-500">
              {permissionLabel[notificationPermission] ?? "Unknown"}
            </p>
          </div>
          {notificationPermission === "default" && (
            <Button variant="secondary" size="sm" onClick={onRequestNotifications}>
              Enable
            </Button>
          )}
        </div>

        {/* Save */}
        <Button onClick={handleSave} loading={saving} size="lg" className="w-full">
          Save changes
        </Button>

        {/* Reset */}
        <div className="border-t border-sage-100 dark:border-dusk-700 pt-4">
          <Button
            variant={confirmReset ? "danger" : "ghost"}
            size="sm"
            className="w-full"
            onClick={handleReset}
          >
            {confirmReset ? "Tap again to confirm reset" : "Reset all data"}
          </Button>
          {confirmReset && (
            <p className="text-xs text-center text-coral-500 mt-1">
              This will clear your EDD and all notification history.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
