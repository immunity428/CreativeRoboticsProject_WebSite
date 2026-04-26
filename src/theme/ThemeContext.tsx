// src/theme/ThemeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildTheme, type ThemeMode, type ThemeTokens } from "./tokens";

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  primary: string;
  setPrimary: (v: string) => void;
  accent: string;
  setAccent: (v: string) => void;
  autoMode: boolean;
  setAutoMode: (v: boolean) => void;
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
  initialPrimary?: string;
  initialAccent?: string;
}

export function ThemeProvider({
  children,
  initialMode = "dark",
  initialPrimary = "#7ce4b8",
  initialAccent = "#e91e63",
}: ProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [primary, setPrimary] = useState<string>(initialPrimary);
  const [accent, setAccent] = useState<string>(initialAccent);
  const [autoMode, setAutoMode] = useState<boolean>(false);

  // OS の prefers-color-scheme に追従
  useEffect(() => {
    if (!autoMode) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setMode(mq.matches ? "dark" : "light");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [autoMode]);

  // モード切替時、未カスタムなら primary をモード既定値に追従
  useEffect(() => {
    if (mode === "light" && primary === "#7ce4b8") setPrimary("#1a7f5a");
    if (mode === "dark" && primary === "#1a7f5a") setPrimary("#7ce4b8");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const tokens = useMemo(
    () => buildTheme(mode, { primary, accent }),
    [mode, primary, accent],
  );

  const value: ThemeContextValue = {
    mode,
    setMode,
    primary,
    setPrimary,
    accent,
    setAccent,
    autoMode,
    setAutoMode,
    tokens,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
