import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle({ post }: { post?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className={clsx({ "text-white": post })}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden w-5 h-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
