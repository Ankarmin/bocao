import { cn } from "@/lib/utils";

type ProgressProps = {
  value?: number;
  className?: string;
};

export function Progress({ value = 0, className }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={safeValue}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      role="progressbar"
    >
      <div className="h-full bg-primary transition-all" style={{ width: `${safeValue}%` }} />
    </div>
  );
}
