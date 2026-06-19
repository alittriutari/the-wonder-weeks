"use client";

import { useState } from "react";
import { getLeapObservations } from "@/data/leap-observations";
import clsx from "clsx";

interface ObservationGuideProps {
  leapNumber: number;
}

const DISCLAIMER =
  "These observations come from the Wonder Weeks framework and are not predictive. Individual babies may show many, few, or none of these patterns.";

const ABSENCE_NOTE =
  "Absence of these observations does not indicate a developmental concern.";

function ObservationList({
  items,
  color,
}: {
  items: string[];
  color: "amber" | "sage";
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs">
          <span
            className={clsx(
              "w-1 h-1 rounded-full mt-1.5 flex-shrink-0",
              color === "amber"
                ? "bg-amber-400 dark:bg-amber-500"
                : "bg-sage-400 dark:bg-dusk-400"
            )}
          />
          <span className="text-sage-600 dark:text-dusk-300 leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ObservationGuide({ leapNumber }: ObservationGuideProps) {
  const [open, setOpen] = useState(false);
  const observations = getLeapObservations(leapNumber);

  if (!observations) return null;

  return (
    <div className="mt-3 pt-3 border-t border-sage-100 dark:border-dusk-700">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={clsx(
          "w-full flex items-center justify-between gap-2",
          "text-xs font-medium rounded-lg px-2 py-1.5 -mx-2",
          "text-sage-600 dark:text-dusk-300",
          "hover:bg-sage-50 dark:hover:bg-dusk-800",
          "transition-colors duration-150"
        )}
      >
        <span className="flex items-center gap-1.5">
          {/* Eye icon */}
          <svg
            className="w-3.5 h-3.5 text-sage-400 dark:text-dusk-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Commonly Reported Observations
        </span>
        <svg
          className={clsx(
            "w-3.5 h-3.5 text-sage-400 dark:text-dusk-500 transition-transform duration-200 flex-shrink-0",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="mt-2 space-y-3 animate-slide-up">
          {/* Disclaimer */}
          <p className="text-xs text-sage-400 dark:text-dusk-500 italic leading-relaxed bg-sage-50 dark:bg-dusk-800 rounded-lg px-3 py-2">
            {DISCLAIMER}
          </p>

          {/* Before section */}
          {observations.before.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                Before the leap
              </p>
              <ObservationList items={observations.before} color="amber" />
            </div>
          )}

          {/* During section */}
          {observations.during.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-sage-600 dark:text-dusk-300 mb-1.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-400 dark:bg-dusk-400" />
                During the leap
              </p>
              <ObservationList items={observations.during} color="sage" />
            </div>
          )}

          {/* Leap-specific note */}
          {observations.note && (
            <p className="text-xs text-sage-400 dark:text-dusk-500 leading-relaxed border-l-2 border-sage-200 dark:border-dusk-600 pl-2.5">
              {observations.note}
            </p>
          )}

          {/* Absence note */}
          <p className="text-xs text-sage-400 dark:text-dusk-500 italic">
            {ABSENCE_NOTE}
          </p>
        </div>
      )}
    </div>
  );
}
