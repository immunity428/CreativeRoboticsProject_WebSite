// src/sections/Faq.tsx
import { useTheme } from "../theme/ThemeContext";
import faqData from "../data/faq.json";

const FAQ_ITEMS = faqData.items;

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
              key={item.question}
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
                <span style={{ fontSize: 15, fontWeight: 800 }}>{item.question}</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.85,
                  color: T.textMute,
                  paddingLeft: 38,
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
