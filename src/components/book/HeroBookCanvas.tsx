import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

const HeroBookScene = lazy(() => import("@/components/book/HeroBookScene"));

interface HeroBookCanvasProps {
  className?: string;
}

export const HeroBookCanvas = ({ className }: HeroBookCanvasProps) => (
  <div
    className={cn("book-cover-3d", className)}
    aria-label="Digital Degrowth book cover — move pointer to rotate"
  >
    <Suspense
      fallback={
        <img
          src="/assets/book_logo.png"
          alt="Digital Degrowth Book Cover"
          className="h-full w-full object-cover"
        />
      }
    >
      <HeroBookScene />
    </Suspense>
  </div>
);
