"use client";

import { format } from "date-fns";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { ComputedLeap } from "@/types";

interface CurrentLeapCardProps {
  activeLeap: ComputedLeap | null;
  nextLeap: ComputedLeap | null;
}

export default function CurrentLeapCard({
  activeLeap,
  nextLeap,
}: CurrentLeapCardProps) {
  if (activeLeap) {
    const progress =
      activeLeap.daysActive !== null
        ? Math.round(
            (activeLeap.daysActive /
              Math.max(
                1,
                Math.round(
                  (activeLeap.endDate.getTime() -
                    activeLeap.startDate.getTime()) /
                    86400000
                )
              )) *
              100
          )
        : 0;

    return (
      <Card highlight>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sage-400 dark:text-dusk-500 mb-1">
              Leap {activeLeap.definition.number}
            </p>
            <h2 className="text-lg font-semibold text-sage-800 dark:text-dusk-100 leading-snug">
              {activeLeap.definition.name}
            </h2>
          </div>
          <Badge status="active" />
        </div>

        <p className="text-sm text-sage-600 dark:text-dusk-300 mb-4 leading-relaxed">
          {activeLeap.definition.description}
        </p>

        {/* Progress bar */}
        <div className="mb-1">
          <div className="h-1.5 rounded-full bg-sage-100 dark:bg-dusk-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-sage-400 dark:bg-dusk-400 transition-all duration-500"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-sage-400 dark:text-dusk-500">
          <span>Day {(activeLeap.daysActive ?? 0) + 1}</span>
          {activeLeap.daysUntilEnd !== null && (
            <span>{activeLeap.daysUntilEnd} day{activeLeap.daysUntilEnd !== 1 ? "s" : ""} left</span>
          )}
        </div>

        {/* Skills */}
        {activeLeap.definition.skills.length > 0 && (
          <div className="mt-4 pt-4 border-t border-sage-100 dark:border-dusk-700">
            <p className="text-xs font-medium text-sage-500 dark:text-dusk-400 mb-2">
              Developmental focus this leap
            </p>
            <ul className="space-y-1">
              {activeLeap.definition.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-2 text-xs text-sage-600 dark:text-dusk-300"
                >
                  <span className="w-1 h-1 rounded-full bg-sage-400 dark:bg-dusk-400 mt-1.5 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    );
  }

  if (nextLeap) {
    return (
      <Card>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sage-400 dark:text-dusk-500 mb-1">
              Next — Leap {nextLeap.definition.number}
            </p>
            <h2 className="text-lg font-semibold text-sage-800 dark:text-dusk-100 leading-snug">
              {nextLeap.definition.name}
            </h2>
          </div>
          <Badge status={nextLeap.status} />
        </div>
        <p className="text-sm text-sage-600 dark:text-dusk-300 mb-3 leading-relaxed">
          {nextLeap.definition.description}
        </p>
        {nextLeap.daysUntilStart !== null && (
          <p className="text-sm font-medium text-sage-700 dark:text-dusk-200">
            Starts in{" "}
            <strong className="text-sage-800 dark:text-dusk-100">
              {nextLeap.daysUntilStart} day
              {nextLeap.daysUntilStart !== 1 ? "s" : ""}
            </strong>{" "}
            · {format(nextLeap.startDate, "MMM d, yyyy")}
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🎉</div>
        <h2 className="text-lg font-semibold text-sage-800 dark:text-dusk-100 mb-1">
          All leaps complete!
        </h2>
        <p className="text-sm text-sage-500 dark:text-dusk-400">
          Your baby has moved through all 10 Wonder Weeks developmental windows.
        </p>
      </div>
    </Card>
  );
}
