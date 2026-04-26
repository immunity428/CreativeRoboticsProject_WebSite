// src/theme/tokens.ts

export type ThemeMode = "light" | "dark";

export interface ThemeTokens {
  bg: string;
  bgDeep: string;
  bgGrad: string;
  surface: string;
  border: string;
  borderStrong: string;
  text: string;
  textMute: string;
  textMute2: string;
  textFoot: string;
  primary: string;
  primaryStrong: string;
  primaryGradTo: string;
  accent: string;
  yellow: string;
  dotBg: string;
  pillBg: string;
  pillBorder: string;
  placeholder: "" | "dark";
  heroOverlay: string;
  heroBorder: string;
  ctaGrad: string;
  ctaDots: string;
  inputBorder: string;
  cardText: string;
}

export const THEMES: Record<ThemeMode, ThemeTokens> = {
  dark: {
    bg: "#0e1a2b",
    bgDeep: "#0a1320",
    bgGrad: "linear-gradient(180deg, #0a1320, #0e1a2b)",
    surface: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.2)",
    text: "#f0f6ff",
    textMute: "#a8c0d8",
    textMute2: "#cfdcec",
    textFoot: "#6b7e92",
    primary: "#7ce4b8",
    primaryStrong: "#1a7f5a",
    primaryGradTo: "#2dd4a0",
    accent: "#e91e63",
    yellow: "#ffd23f",
    dotBg: "rgba(125,228,184,0.15)",
    pillBg: "rgba(125,228,184,0.12)",
    pillBorder: "rgba(125,228,184,0.3)",
    placeholder: "dark",
    heroOverlay:
      "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -20px rgba(125,228,184,0.3)",
    heroBorder: "rgba(125,228,184,0.4)",
    ctaGrad: "linear-gradient(135deg, #1a7f5a 0%, #0a3a2a 100%)",
    ctaDots: "rgba(255,255,255,0.1)",
    inputBorder: "#e8e6df",
    cardText: "#0e1a2b",
  },
  light: {
    bg: "#f7f4ec",
    bgDeep: "#fdfbf3",
    bgGrad: "linear-gradient(180deg, #fdfbf3, #f7f4ec)",
    surface: "rgba(26,42,35,0.04)",
    border: "rgba(26,42,35,0.10)",
    borderStrong: "rgba(26,42,35,0.20)",
    text: "#0e1a2b",
    textMute: "#4a5a6a",
    textMute2: "#3a4a5a",
    textFoot: "#7a8794",
    primary: "#1a7f5a",
    primaryStrong: "#1a7f5a",
    primaryGradTo: "#2dd4a0",
    accent: "#e91e63",
    yellow: "#e6a700",
    dotBg: "rgba(26,127,90,0.12)",
    pillBg: "rgba(26,127,90,0.10)",
    pillBorder: "rgba(26,127,90,0.30)",
    placeholder: "",
    heroOverlay: "0 30px 60px -20px rgba(26,42,35,0.25)",
    heroBorder: "rgba(26,127,90,0.4)",
    ctaGrad: "linear-gradient(135deg, #1a7f5a 0%, #145c42 100%)",
    ctaDots: "rgba(255,255,255,0.18)",
    inputBorder: "#d6d2c4",
    cardText: "#0e1a2b",
  },
};

export interface ThemeOverrides {
  primary?: string;
  accent?: string;
}

export const buildTheme = (
  mode: ThemeMode,
  overrides: ThemeOverrides = {},
): ThemeTokens => {
  const base = THEMES[mode];
  return {
    ...base,
    primary: overrides.primary ?? base.primary,
    primaryStrong: overrides.primary ?? base.primaryStrong,
    accent: overrides.accent ?? base.accent,
  };
};
