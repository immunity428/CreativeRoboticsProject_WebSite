// src/components/ShinkansenSVG.tsx
import type { CSSProperties } from "react";

interface Props {
  width?: number;
  color?: string;
  accent?: string;
  flip?: boolean;
  style?: CSSProperties;
}

export default function ShinkansenSVG({
  width = 180,
  color = "#1a7f5a",
  accent = "#e91e63",
  flip = false,
  style,
}: Props) {
  return (
    <svg
      width={width}
      viewBox="0 0 240 60"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        display: "block",
        ...style,
      }}
    >
      <path
        d="M 12 38 Q 8 28 28 22 L 200 18 Q 230 18 235 36 L 235 44 Q 235 48 230 48 L 18 48 Q 12 48 12 42 Z"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M 200 18 Q 230 18 235 36 L 235 44 Q 235 48 230 48 L 215 48 L 215 38 Q 215 24 200 24 Z"
        fill={color}
      />
      <rect x="14" y="40" width="218" height="3" fill={accent} />
      {[40, 70, 100, 130, 160].map((x, i) => (
        <rect key={i} x={x} y="28" width="20" height="9" rx="2" fill="#1a2a23" />
      ))}
      <circle cx="50" cy="50" r="5" fill="#1a2a23" />
      <circle cx="120" cy="50" r="5" fill="#1a2a23" />
      <circle cx="190" cy="50" r="5" fill="#1a2a23" />
    </svg>
  );
}
