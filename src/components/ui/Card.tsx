import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export default function Card({ children, className, highlight }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-5 transition-all duration-200",
        "bg-white dark:bg-dusk-900",
        "border border-sage-200 dark:border-dusk-700",
        highlight &&
          "ring-2 ring-sage-400 dark:ring-dusk-400 shadow-lg shadow-sage-200/50 dark:shadow-dusk-900/50",
        !highlight && "shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
