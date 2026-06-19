"use client";

import { useMemo } from "react";
import {
  computeAllLeaps,
  findActiveLeap,
  findNextLeap,
} from "@/lib/leap-calculator";
import type { ComputedLeap } from "@/types";

interface UseLeapsReturn {
  leaps: ComputedLeap[];
  activeLeap: ComputedLeap | null;
  nextLeap: ComputedLeap | null;
}

export function useLeaps(edd: Date | null): UseLeapsReturn {
  const leaps = useMemo(
    () => (edd ? computeAllLeaps(edd) : []),
    [edd]
  );

  const activeLeap = useMemo(() => findActiveLeap(leaps), [leaps]);
  const nextLeap = useMemo(() => findNextLeap(leaps), [leaps]);

  return { leaps, activeLeap, nextLeap };
}
