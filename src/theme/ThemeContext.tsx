// src/theme/ThemeContext.tsx
import {
  createContext,
  useContext,
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
  initialPrimary?: string;
  initialAccent?: string;
}

export function ThemeProvider({
  children,
  initialPrimary = "#1a7f5a",
  initialAccent = "#e91e63",
}: ProviderProps) {
  const [primary, setPrimary] = useState<string>(initialPrimary);
  const [accent, setAccent] = useState<string>(initialAccent);

  const tokens = useMemo(
    () => buildTheme("light", { primary, accent }),
    [primary, accent],
  );

  const value: ThemeContextValue = {
    mode: "light",
    setMode: () => {},        // ダークモード削除済み — no-op
    primary,
    setPrimary,
    accent,
    setAccent,
    autoMode: false,
    setAutoMode: () => {},    // ダークモード削除済み — no-op
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