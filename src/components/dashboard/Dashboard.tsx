"use client";

import { useState } from "react";
import AgeCard from "./AgeCard";
import CurrentLeapCard from "./CurrentLeapCard";
import LeapList from "@/components/leaps/LeapList";
import Timeline from "@/components/timeline/Timeline";
import NotificationBanner from "@/components/notifications/NotificationBanner";
import SettingsModal from "@/components/settings/SettingsModal";
import Button from "@/components/ui/Button";
import type { BabyProfile, ComputedLeap } from "@/types";
import type { DueNotification } from "@/lib/notification-service";
import clsx from "clsx";

type Tab = "overview" | "leaps" | "timeline";

interface DashboardProps {
  profile: BabyProfile;
  edd: Date;
  leaps: ComputedLeap[];
  activeLeap: ComputedLeap | null;
  nextLeap: ComputedLeap | null;
  notificationPermission: NotificationPermission | "unsupported";
  missedReminders: DueNotification[];
  onRequestNotifications: () => Promise<void>;
  onDismissReminder: (id: string) => void;
  onUpdateEDD: (isoDate: string, name?: string) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "leaps", label: "All Leaps" },
  { id: "timeline", label: "Timeline" },
];

export default function Dashboard({
  profile,
  edd,
  leaps,
  activeLeap,
  nextLeap,
  notificationPermission,
  missedReminders,
  onRequestNotifications,
  onDismissReminder,
  onUpdateEDD,
}: DashboardProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-dusk-950/80 backdrop-blur-md border-b border-sage-100 dark:border-dusk-800">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-sage-800 dark:text-dusk-100">
              {profile.name ? `${profile.name}'s Leaps` : "Wonder Weeks"}
            </h1>
            {notificationPermission === "default" && (
              <button
                onClick={onRequestNotifications}
                className="text-xs text-amber-500 dark:text-amber-400 hover:underline"
              >
                Enable notifications →
              </button>
            )}
          </div>
          <button
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
            className="w-8 h-8 flex items-center justify-center rounded-xl
              text-sage-500 dark:text-dusk-400
              hover:bg-sage-100 dark:hover:bg-dusk-800
              transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-lg mx-auto px-4 flex gap-1 pb-0">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={clsx(
                "px-3 py-2 text-sm font-medium border-b-2 transition-all duration-150",
                tab === id
                  ? "border-sage-500 dark:border-dusk-400 text-sage-700 dark:text-dusk-200"
                  : "border-transparent text-sage-400 dark:text-dusk-500 hover:text-sage-600 dark:hover:text-dusk-300"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* Missed reminders always visible */}
        {missedReminders.length > 0 && (
          <NotificationBanner
            reminders={missedReminders}
            onDismiss={onDismissReminder}
          />
        )}

        {tab === "overview" && (
          <>
            <AgeCard edd={edd} babyName={profile.name} />
            <CurrentLeapCard activeLeap={activeLeap} nextLeap={nextLeap} />
          </>
        )}

        {tab === "leaps" && (
          <LeapList leaps={leaps} activeLeap={activeLeap} nextLeap={nextLeap} />
        )}

        {tab === "timeline" && (
          <Timeline leaps={leaps} edd={edd} />
        )}
      </main>

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          profile={profile}
          notificationPermission={notificationPermission}
          onUpdateEDD={onUpdateEDD}
          onRequestNotifications={onRequestNotifications}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
