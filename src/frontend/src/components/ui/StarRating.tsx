import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Rating: ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starNum = i + 1;
        const filled = starNum <= Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <button
            key={starNum}
            type={interactive ? "button" : undefined}
            onClick={
              interactive && onChange ? () => onChange(starNum) : undefined
            }
            disabled={!interactive}
            className={cn(
              "transition-smooth",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "pointer-events-none",
            )}
            aria-label={
              interactive
                ? `Rate ${starNum} star${starNum !== 1 ? "s" : ""}`
                : undefined
            }
          >
            <Star
              className={cn(
                sizeMap[size],
                filled
                  ? "fill-accent text-accent"
                  : partial
                    ? "fill-accent/50 text-accent"
                    : "fill-muted text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
