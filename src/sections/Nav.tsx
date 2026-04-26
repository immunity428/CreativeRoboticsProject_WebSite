// src/sections/Nav.tsx
import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";

export default function Nav() {
  const { tokens: T } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["特徴", "授業風景", "講師", "FAQ", "アクセス"];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${T.border}`,
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* ロゴ */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${T.primaryStrong}, ${T.primaryGradTo})`,
              display: "grid",
              placeItems: "center",
              fontSize: 20,
            }}
          >
            🚄
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>ロボット創造教室</div>
            <div style={{ fontSize: 9, color: T.primary, letterSpacing: "0.2em" }}>
              ROBOT CREATIVE LAB
            </div>
          </div>
        </div>

        {/* PC: ナビリンク */}
        <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 13, color: T.textMute }}>
          {links.map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
        </div>

        {/* PC: CTAボタン */}
        <button
          type="button"
          className="nav-cta-desktop"
          style={{
            background: T.accent,
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 13,
            boxShadow: `0 0 24px ${T.accent}66`,
            cursor: "pointer",
          }}
        >
          応募はこちら →
        </button>

        {/* SP: ハンバーガー */}
        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: T.text,
                borderRadius: 2,
                transition: "all 0.2s",
                transform:
                  menuOpen
                    ? i === 0 ? "translateY(7px) rotate(45deg)"
                    : i === 2 ? "translateY(-7px) rotate(-45deg)"
                    : "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* SP: ドロワーメニュー */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 0,
            background: T.surface,
            borderBottom: `1px solid ${T.border}`,
            zIndex: 99,
          }}
        >
          {links.map(l => (
            <div
              key={l}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "16px 24px",
                fontSize: 15,
                fontWeight: 600,
                color: T.text,
                borderBottom: `1px solid ${T.border}`,
                cursor: "pointer",
              }}
            >
              {l}
            </div>
          ))}
          <div style={{ padding: 16 }}>
            <button
              type="button"
              style={{
                width: "100%",
                background: T.accent,
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              応募はこちら →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
