// src/theme/tokens.ts

export type ThemeMode = "light";

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

export const LIGHT_THEME: ThemeTokens = {
  bg:            "#0e1a2b",
  bgDeep:        "#0a1320",
  bgGrad:        "linear-gradient(180deg, #0a1320, #0e1a2b)",
  surface:       "rgba(255,255,255,0.06)",
  border:        "rgba(255,255,255,0.10)",
  borderStrong:  "rgba(255,255,255,0.22)",
  // ─── すべての文字を白系に統一 ───
  text:          "#ffffff",
  textMute:      "#c8daf0",
  textMute2:     "#e0ecff",
  textFoot:      "#7a94aa",
  // ─── アクセントカラー ───
  primary:       "#7ce4b8",
  primaryStrong: "#4fd9a0",
  primaryGradTo: "#2dd4a0",
  accent:        "#e91e63",
  yellow:        "#ffd23f",
  dotBg:         "rgba(125,228,184,0.15)",
  pillBg:        "rgba(125,228,184,0.12)",
  pillBorder:    "rgba(125,228,184,0.30)",
  placeholder:   "dark",
  heroOverlay:   "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -20px rgba(125,228,184,0.3)",
  heroBorder:    "rgba(125,228,184,0.4)",
  ctaGrad:       "linear-gradient(135deg, #1a7f5a 0%, #0a3a2a 100%)",
  ctaDots:       "rgba(255,255,255,0.10)",
  inputBorder:   "#334a66",
  // NOW BOARDING バッジなど primaryBg 上の文字も白に
  cardText:      "#ffffff",
};

export interface ThemeOverrides {
  primary?: string;
  accent?: string;
}

export const buildTheme = (
  _mode: ThemeMode,
  overrides: ThemeOverrides = {},
): ThemeTokens => {
  return {
    ...LIGHT_THEME,
    primary:       overrides.primary ?? LIGHT_THEME.primary,
    primaryStrong: overrides.primary ?? LIGHT_THEME.primaryStrong,
    accent:        overrides.accent  ?? LIGHT_THEME.accent,
  };
};