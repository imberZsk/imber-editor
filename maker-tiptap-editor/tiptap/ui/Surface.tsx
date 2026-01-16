import { HTMLProps, forwardRef } from "react";
import { cn } from "@/tiptap/utils";

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, className, withShadow = true, withBorder = true, ...props }, ref) => {
    const surfaceClass = cn(
      className,
      "bg-[var(--bg)] rounded-lg",
      withShadow ? "shadow-sm" : "",
      withBorder ? "border border-[var(--gray-6)]" : "",
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Surface.displayName = "Surface";
