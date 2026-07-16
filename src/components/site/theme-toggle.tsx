"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "opslin-color-theme";
const THEME_CHANGE_EVENT = "opslin-theme-change";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isTheme(stored)) return stored;
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColor = getComputedStyle(root).getPropertyValue("--opslin-bg-canvas").trim();
  const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor && themeColorMeta) themeColorMeta.content = themeColor;
}

function subscribe(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && isTheme(event.newValue)) onStoreChange();
  };
  const handleThemeChange = (event: Event) => {
    if (isTheme((event as CustomEvent<Theme>).detail)) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className="site-theme-toggle"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      data-theme={theme}
      onClick={() => {
        const nextTheme: Theme = isDark ? "light" : "dark";
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
        window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: nextTheme }));
      }}
    >
      <span className="site-theme-toggle-icons" aria-hidden="true">
        <Sun className="site-theme-icon site-theme-icon-sun" />
        <Moon className="site-theme-icon site-theme-icon-moon" />
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
