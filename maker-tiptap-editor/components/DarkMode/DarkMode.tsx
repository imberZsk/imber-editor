"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, SunMoon, Moon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 只在组件首次挂载时执行
  //
  // 原因：
  // React 的组件生命周期中，某些操作（如获取当前主题、执行 DOM 操作等）需要在组件挂载后执行。
  // mounted 的逻辑确保只有在组件挂载后才去渲染相关内容，从而避免错误或不必要的操作。
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="fixed bottom-4 right-4 z-[99999] flex items-center gap-1 p-1">
      <ToggleGroup
        type="single"
        variant="outline"
        value={theme}
        onValueChange={(value) => {
          setTheme(value);
        }}
      >
        <ToggleGroupItem value="light" aria-label="light">
          <Sun className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="system">
          <SunMoon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="dark">
          <Moon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default DarkMode;
