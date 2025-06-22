import { useCallback, useEffect } from "react";
import { type Theme, useTheme } from "@/providers/theme-provider";
import { cn } from "@/utils";
import { LaptopIcon, MenuIcon, MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui";

const THEME_KEYBOARD_SHORTCUT = "m";

interface AppMenuProps {
  handleReset: () => void;
}

export function AppMenu({ handleReset }: AppMenuProps) {
  const { theme, themes, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const getNextTheme = (current: Theme): Theme => {
      const idx = themes.indexOf(current);
      return themes[(idx + 1) % themes.length];
    };

    setTheme(getNextTheme(theme as Theme));
  }, [setTheme, theme, themes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === THEME_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-sm"
        >
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 border border-border/80 bg-card/40 shadow-xl backdrop-blur-xs"
        align="end"
        sideOffset={24}
        alignOffset={-16}
      >
        <DropdownMenuItem onClick={toggleTheme}>
          <span className="relative h-4 w-4 flex-shrink-0">
            <SunIcon
              className={cn(
                "absolute inset-0 h-full w-full transition-all",
                theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
              )}
            />
            <MoonIcon
              className={cn(
                "absolute inset-0 h-full w-full transition-all",
                theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
              )}
            />
            <LaptopIcon
              className={cn(
                "absolute inset-0 h-full w-full transition-all",
                theme === "system" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
              )}
            />
          </span>
          <span>Toggle theme</span>
          <DropdownMenuShortcut>⌘{THEME_KEYBOARD_SHORTCUT.toUpperCase()}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleReset}
          variant="destructive"
        >
          <RotateCcwIcon className="h-4 w-4" />
          <span>Reset</span>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
