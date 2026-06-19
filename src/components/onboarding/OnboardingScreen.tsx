"use client";

import { useState } from "react";
import { format, isAfter, startOfDay } from "date-fns";
import { isValidEDD, parseEDDString } from "@/lib/age-calculator";
import Button from "@/components/ui/Button";

interface OnboardingScreenProps {
  onSave: (isoDate: string, name?: string) => void;
}

export default function OnboardingScreen({ onSave }: OnboardingScreenProps) {
  const [eddValue, setEddValue] = useState("");
  const [babyName, setBabyName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  function validate(): string | null {
    if (!eddValue) return "Please enter your baby's due date.";

    const parsed = parseEDDString(eddValue);
    if (isNaN(parsed.getTime())) return "That doesn't look like a valid date.";

    if (isAfter(startOfDay(parsed), startOfDay(new Date()))) {
      return "The due date can't be in the future. Wonder Weeks tracking starts from the due date.";
    }

    if (!isValidEDD(parsed)) {
      return "This date is more than 2 years ago — all 10 leaps will have already passed.";
    }

    return null;
  }

  function handleSubmit() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);
    // Small delay for perceived responsiveness
    setTimeout(() => {
      onSave(eddValue, babyName.trim() || undefined);
      setSubmitting(false);
    }, 300);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10 max-w-sm">
        <div className="text-5xl mb-4" role="img" aria-label="baby">🌱</div>
        <h1 className="text-3xl font-bold tracking-tight text-sage-800 dark:text-dusk-100 mb-2">
          Wonder Weeks
        </h1>
        <p className="text-sage-600 dark:text-dusk-300 text-sm leading-relaxed">
          Track your baby&apos;s developmental leaps. All calculations are based
          on your baby&apos;s <strong>Estimated Due Date</strong> — not their
          actual birth date — as recommended by the Wonder Weeks methodology.
        </p>
      </div>

      {/* Form card */}
      <div className="w-full max-w-sm bg-white dark:bg-dusk-900 rounded-2xl border border-sage-200 dark:border-dusk-700 shadow-md p-6 space-y-5 animate-slide-up">
        <div>
          <label
            htmlFor="baby-name"
            className="block text-sm font-medium text-sage-700 dark:text-dusk-200 mb-1.5"
          >
            Baby&apos;s name{" "}
            <span className="text-sage-400 dark:text-dusk-500 font-normal">
              (optional)
            </span>
          </label>
          <input
            id="baby-name"
            type="text"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            placeholder="e.g. Lila"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm
              bg-sage-50 dark:bg-dusk-800
              border border-sage-200 dark:border-dusk-600
              text-sage-900 dark:text-dusk-100
              placeholder:text-sage-400 dark:placeholder:text-dusk-500
              focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-dusk-500
              transition-all duration-150"
          />
        </div>

        <div>
          <label
            htmlFor="edd"
            className="block text-sm font-medium text-sage-700 dark:text-dusk-200 mb-1.5"
          >
            Estimated Due Date (EDD)
          </label>
          <input
            id="edd"
            type="date"
            value={eddValue}
            max={today}
            onChange={(e) => {
              setEddValue(e.target.value);
              if (error) setError("");
            }}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm
              bg-sage-50 dark:bg-dusk-800
              border border-sage-200 dark:border-dusk-600
              text-sage-900 dark:text-dusk-100
              focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-dusk-500
              transition-all duration-150
              [color-scheme:light] dark:[color-scheme:dark]"
          />
          {error && (
            <p
              role="alert"
              className="mt-2 text-xs text-coral-500 dark:text-coral-400 flex items-start gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}
          <p className="mt-2 text-xs text-sage-400 dark:text-dusk-500">
            If your baby was born early or late, use the original due date —
            this is how Wonder Weeks tracks developmental timing.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          loading={submitting}
          size="lg"
          className="w-full"
        >
          Start tracking
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-center text-sage-400 dark:text-dusk-600 max-w-xs leading-relaxed">
        Wonder Weeks leaps are a developmental framework, not a precise
        predictor of behavior. Every baby grows at their own pace.
      </p>
    </div>
  );
}
