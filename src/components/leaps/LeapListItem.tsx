"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import Badge from "@/components/ui/Badge";
import ObservationGuide from "./ObservationGuide";
import type { ComputedLeap } from "@/types";
import clsx from "clsx";

interface LeapListItemProps {
  leap: ComputedLeap;
  isHighlighted?: boolean;
}

export default function LeapListItem({ leap, isHighlighted }: LeapListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { definition, startDate, endDate, status } = leap;
  const duration = differenceInDays(endDate, startDate) + 1;

  return (
    <div
      className={clsx(
        "rounded-2xl border transition-all duration-200",
        "bg-white dark:bg-dusk-900",
        isHighlighted
          ? "border-sage-300 dark:border-dusk-500 shadow-md"
          : "border-sage-100 dark:border-dusk-800",
        status === "completed" && "opacity-60"
      )}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Leap number pill */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={clsx(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                status === "active"
                  ? "bg-sage-500 dark:bg-dusk-500 text-white"
                  : status === "upcoming"
                  ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                  : status === "completed"
                  ? "bg-sage-100 dark:bg-dusk-800 text-sage-400 dark:text-dusk-500"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              )}
            >
              {definition.number}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sage-800 dark:text-dusk-100 truncate">
                {definition.name}
              </p>
              <p className="text-xs text-sage-400 dark:text-dusk-500 mt-0.5">
                {format(startDate, "MMM d")} – {format(endDate, "MMM d, yyyy")}{" "}
                · {duration} days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge status={status} />
            <svg
              className={clsx(
                "w-4 h-4 text-sage-400 dark:text-dusk-500 transition-transform duration-200",
                expanded && "rotate-180"
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
          </div>
        </div>

        {/* Inline countdown for upcoming */}
        {status === "upcoming" && leap.daysUntilStart !== null && (
          <p className="mt-2 ml-11 text-xs font-medium text-amber-600 dark:text-amber-400">
            Starts in {leap.daysUntilStart} day{leap.daysUntilStart !== 1 ? "s" : ""}
          </p>
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 ml-11 animate-slide-up">
          <p className="text-sm text-sage-600 dark:text-dusk-300 leading-relaxed mb-3">
            {definition.description}
          </p>
          {definition.skills.length > 0 && (
            <ul className="space-y-1">
              {definition.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-2 text-xs text-sage-500 dark:text-dusk-400"
                >
                  <span className="w-1 h-1 rounded-full bg-sage-300 dark:bg-dusk-500 mt-1.5 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          )}
          <ObservationGuide leapNumber={definition.number} />
        </div>
      )}
    </div>
  );
}
