import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full border-primary/20 border-t-primary animate-spin",
        sizeMap[size],
        className,
      )}
    />
  );
}

interface PageSpinnerProps {
  message?: string;
}

export function PageSpinner({ message = "Loading..." }: PageSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] gap-4"
      data-ocid="page.loading_state"
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
}
