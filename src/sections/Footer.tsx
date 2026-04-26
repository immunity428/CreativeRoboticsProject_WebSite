// src/sections/Footer.tsx
import { useTheme } from "../theme/ThemeContext";

export default function Footer() {
  const { tokens: T } = useTheme();
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
            text-align: center !important;
          }
        }
      `}</style>
      <footer
        style={{
          padding: "32px 24px",
          borderTop: `1px solid ${T.border}`,
          fontSize: 12,
          color: T.textFoot,
        }}
      >
        <div
          className="footer-inner"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>© 2025 ロボット創造教室 /</div>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ cursor: "pointer" }}>プライバシーポリシー</span>
            <span style={{ cursor: "pointer" }}>お問い合わせ</span>
          </div>
        </div>
      </footer>
    </>
  );
}
