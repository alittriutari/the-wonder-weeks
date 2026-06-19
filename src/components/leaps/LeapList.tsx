"use client";

import LeapListItem from "./LeapListItem";
import type { ComputedLeap } from "@/types";

interface LeapListProps {
  leaps: ComputedLeap[];
  activeLeap: ComputedLeap | null;
  nextLeap: ComputedLeap | null;
}

export default function LeapList({ leaps, activeLeap, nextLeap }: LeapListProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-sage-400 dark:text-dusk-500 mb-3 px-1">
        All leaps
      </h2>
      <div className="space-y-2">
        {leaps.map((leap) => (
          <LeapListItem
            key={leap.definition.number}
            leap={leap}
            isHighlighted={
              leap.definition.number === activeLeap?.definition.number ||
              leap.definition.number === nextLeap?.definition.number
            }
          />
        ))}
      </div>
    </section>
  );
}
