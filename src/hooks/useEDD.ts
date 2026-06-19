"use client";

import { useCallback, useEffect, useState } from "react";
import { getBabyProfile, saveBabyProfile } from "@/lib/storage";
import { parseEDDString } from "@/lib/age-calculator";
import type { BabyProfile } from "@/types";

interface UseEDDReturn {
  profile: BabyProfile | null;
  edd: Date | null;
  isLoading: boolean;
  saveEDD: (isoDate: string, name?: string) => void;
  clearEDD: () => void;
}

/**
 * Manages the baby's EDD (Estimated Due Date) with localStorage persistence.
 * Accepts an optional babyId for future multi-baby support.
 */
export function useEDD(_babyId?: string): UseEDDReturn {
  const [profile, setProfile] = useState<BabyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getBabyProfile();
    setProfile(stored);
    setIsLoading(false);
  }, []);

  const saveEDD = useCallback((isoDate: string, name?: string) => {
    const newProfile: BabyProfile = {
      id: profile?.id ?? crypto.randomUUID(),
      edd: isoDate,
      name: name ?? profile?.name,
      createdAt: profile?.createdAt ?? new Date().toISOString(),
    };
    saveBabyProfile(newProfile);
    setProfile(newProfile);
  }, [profile]);

  const clearEDD = useCallback(() => {
    setProfile(null);
  }, []);

  const edd = profile ? parseEDDString(profile.edd) : null;

  return { profile, edd, isLoading, saveEDD, clearEDD };
}
