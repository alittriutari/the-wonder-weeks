"use client";

import { useEffect, useState } from "react";
import { useEDD } from "@/hooks/useEDD";
import { useLeaps } from "@/hooks/useLeaps";
import { useNotifications } from "@/hooks/useNotifications";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import Dashboard from "@/components/dashboard/Dashboard";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  const { profile, edd, isLoading, saveEDD } = useEDD();
  const { leaps, activeLeap, nextLeap } = useLeaps(edd);
  const { permission, missedReminders, requestPermission, dismissReminder } =
    useNotifications(leaps);

  // Dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = localStorage.getItem("ww_theme");
    const dark = stored ? stored === "dark" : mq.matches;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ww_theme", next ? "dark" : "light");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sage-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div> */}

      {!profile ? (
        <OnboardingScreen onSave={saveEDD} />
      ) : (
        <Dashboard
          isDark={isDark}
          onToggleTheme={toggleTheme}
          profile={profile}
          edd={edd!}
          leaps={leaps}
          activeLeap={activeLeap}
          nextLeap={nextLeap}
          notificationPermission={permission}
          missedReminders={missedReminders}
          onRequestNotifications={requestPermission}
          onDismissReminder={dismissReminder}
          onUpdateEDD={saveEDD}
        />
      )}
    </div>
  );
}
