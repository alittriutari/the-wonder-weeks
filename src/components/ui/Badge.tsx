import clsx from "clsx";
import type { LeapStatus } from "@/types";

interface BadgeProps {
  status: LeapStatus;
  className?: string;
}

const config: Record<LeapStatus, { label: string; classes: string }> = {
  active: {
    label: "Active now",
    classes:
      "bg-sage-100 text-sage-700 dark:bg-sage-900/40 dark:text-sage-300 ring-1 ring-sage-300 dark:ring-sage-700",
  },
  upcoming: {
    label: "Coming soon",
    classes:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 ring-1 ring-amber-300 dark:ring-amber-700",
  },
  future: {
    label: "Future",
    classes:
      "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  },
  completed: {
    label: "Completed",
    classes:
      "bg-gray-100 text-gray-400 dark:bg-gray-800/50 dark:text-gray-500",
  },
};

export default function Badge({ status, className }: BadgeProps) {
  const { label, classes } = config[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
        classes,
        className
      )}
    >
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-sage-500 dark:bg-sage-400 animate-pulse" />
      )}
      {label}
    </span>
  );
}
