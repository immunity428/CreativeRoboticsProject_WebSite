// src/sections/Faq.tsx
import { useTheme } from "../theme/ThemeContext";

const FAQ_ITEMS = [
  { q: "未経験でも大丈夫?", a: "はい！ほぼ全員が初心者からスタート。プラレールから入るので楽しく始められます。" },
  { q: "何歳から参加できる?", a: "幼児（年長）〜小学6年生まで対応。年齢ごとに課題を調整します。" },
  { q: "持ち物は?", a: "手ぶらでOK！PC・プラレール教材は全て教室で用意します。" },
  { q: "保護者の付き添いは?", a: "ご自由です。送迎のみでも問題ありません。" },
];

export default function Faq() {
  const { tokens: T } = useTheme();
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .faq-section { padding: 60px 20px !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-h2 { font-size: 30px !important; }
        }
      `}</style>
      <section className="faq-section" style={{ padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: "0.3em",
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            ★ FAQ ★
          </div>
          <h2 className="faq-h2" style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>よくある質問</h2>
        </div>
        <div
          className="faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              style={{
                padding: 24,
                background: T.surface,
                borderRadius: 16,
                border: `1px solid ${T.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: T.accent,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    fontSize: 13,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  Q
                </span>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{item.q}</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.85,
                  color: T.textMute,
                  paddingLeft: 38,
                }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
