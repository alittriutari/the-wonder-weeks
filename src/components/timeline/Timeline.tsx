"use client";

import { useRef } from "react";
import { differenceInDays } from "date-fns";
import clsx from "clsx";
import type { ComputedLeap } from "@/types";

interface TimelineProps {
  leaps: ComputedLeap[];
  edd: Date;
}

const TOTAL_WEEKS = 80;
const TOTAL_DAYS = TOTAL_WEEKS * 7;

export default function Timeline({ leaps, edd }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayOffset = Math.max(
    0,
    Math.min(100, (differenceInDays(today, edd) / TOTAL_DAYS) * 100)
  );

  // Month markers every 4 weeks
  const monthMarkers = Array.from({ length: Math.floor(TOTAL_WEEKS / 4) }, (_, i) => ({
    week: (i + 1) * 4,
    pct: (((i + 1) * 4 * 7) / TOTAL_DAYS) * 100,
    label: `${i + 1}m`,
  }));

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-sage-400 dark:text-dusk-500 mb-3 px-1">
        Timeline
      </h2>

      <div
        className="rounded-2xl border border-sage-100 dark:border-dusk-800
          bg-white dark:bg-dusk-900 p-4 overflow-hidden shadow-sm"
      >
        <div ref={scrollRef} className="overflow-x-auto pb-2 -mx-1 px-1">
          {/* Outer track */}
          <div
            className="relative h-14 rounded-xl bg-sage-50 dark:bg-dusk-800 min-w-[560px]"
            style={{ width: "100%" }}
          >
            {/* Leap blocks */}
            {leaps.map((leap) => {
              const left =
                (differenceInDays(leap.startDate, edd) / TOTAL_DAYS) * 100;
              const width =
                (differenceInDays(leap.endDate, leap.startDate) / TOTAL_DAYS) * 100;

              return (
                <div
                  key={leap.definition.number}
                  className={clsx(
                    "absolute top-2 bottom-2 rounded-lg flex items-center justify-center",
                    "transition-all duration-200",
                    leap.status === "active"
                      ? "bg-sage-400 dark:bg-dusk-500 shadow-md"
                      : leap.status === "upcoming"
                      ? "bg-amber-200 dark:bg-amber-900/50"
                      : leap.status === "completed"
                      ? "bg-sage-200 dark:bg-dusk-700"
                      : "bg-gray-100 dark:bg-gray-800"
                  )}
                  style={{
                    left: `${Math.max(0, left)}%`,
                    width: `${Math.max(1, width)}%`,
                  }}
                  title={`Leap ${leap.definition.number}: ${leap.definition.name}`}
                >
                  <span
                    className={clsx(
                      "text-xs font-bold select-none",
                      leap.status === "active"
                        ? "text-white"
                        : leap.status === "upcoming"
                        ? "text-amber-700 dark:text-amber-300"
                        : leap.status === "completed"
                        ? "text-sage-500 dark:text-dusk-400"
                        : "text-gray-400"
                    )}
                  >
                    {leap.definition.number}
                  </span>
                </div>
              );
            })}

            {/* Today marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-coral-500 dark:bg-coral-400 z-10"
              style={{ left: `${todayOffset}%` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-coral-500 dark:bg-coral-400" />
              <div className="absolute top-[52px] left-1/2 -translate-x-1/2 text-[9px] font-medium text-coral-500 dark:text-coral-400 whitespace-nowrap">
                today
              </div>
            </div>
          </div>

          {/* Month labels */}
          <div className="relative h-6 mt-1 min-w-[560px]">
            {monthMarkers.map((m) => (
              <span
                key={m.week}
                className="absolute text-[10px] text-sage-300 dark:text-dusk-600 -translate-x-1/2"
                style={{ left: `${m.pct}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-sage-100 dark:border-dusk-700">
          {[
            { color: "bg-sage-400 dark:bg-dusk-500", label: "Active" },
            { color: "bg-amber-200 dark:bg-amber-900/50", label: "Upcoming" },
            { color: "bg-sage-200 dark:bg-dusk-700", label: "Completed" },
            { color: "bg-coral-500", label: "Today" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-sage-500 dark:text-dusk-400">
              <span className={clsx("w-3 h-3 rounded-sm", color)} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
