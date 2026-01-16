import { cn } from "@/tiptap/utils";
import { memo } from "react";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
  className?: string;
  strokeWidth?: number;
}

export const Icon = memo(({ name, className, strokeWidth = 2.5 }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  if (!LucideIcon) return null;

  return <LucideIcon className={cn("h-4 w-4", className)} strokeWidth={strokeWidth} />;
});

Icon.displayName = "LucideIcon";

export default Icon;
