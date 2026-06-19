"use client";

import { calculateAge, formatAge } from "@/lib/age-calculator";
import Card from "@/components/ui/Card";

interface AgeCardProps {
  edd: Date;
  babyName?: string;
}

export default function AgeCard({ edd, babyName }: AgeCardProps) {
  const age = calculateAge(edd);

  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-widest text-sage-400 dark:text-dusk-500 mb-3">
        {babyName ? `${babyName}'s age` : "Baby's age"}
      </p>

      <div className="flex items-end gap-3 mb-3">
        <span className="text-5xl font-bold tabular-nums text-sage-800 dark:text-dusk-100">
          {age.weeks}
        </span>
        <span className="text-lg text-sage-500 dark:text-dusk-400 mb-1">
          weeks
        </span>
      </div>

      <div className="flex gap-4 text-sm text-sage-600 dark:text-dusk-300">
        <span>
          <strong className="text-sage-700 dark:text-dusk-200">
            {age.totalDays}
          </strong>{" "}
          days
        </span>
        {age.approximateMonths > 0 && (
          <span>
            <strong className="text-sage-700 dark:text-dusk-200">
              ~{age.approximateMonths}
            </strong>{" "}
            month{age.approximateMonths !== 1 ? "s" : ""}
          </span>
        )}
        {age.remainingDays > 0 && (
          <span className="text-sage-400 dark:text-dusk-500">
            +{age.remainingDays}d
          </span>
        )}
      </div>
    </Card>
  );
}
