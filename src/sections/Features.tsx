// src/sections/Features.tsx
import { useTheme } from "../theme/ThemeContext";

export default function Features() {
  const { tokens: T } = useTheme();
  const items = [
    {
      emoji: "🚄",
      num: "01",
      title: "プラレールが教材",
      body: "大好きな新幹線が、自分の手でロボットに変わる。「楽しい」が一番のモチベーション。",
      color: T.primary,
    },
    {
      emoji: "💡",
      num: "02",
      title: "M5Stackで本格派",
      body: "本物のIoTデバイスでコードを書く。電子工作・センサー・無線通信まで体験。",
      color: T.yellow,
    },
    {
      emoji: "🧩",
      num: "03",
      title: "一対一で学べる環境",
      body: "一人一人に学生のサポートがつくので個人の理解に合わせた指導",
      color: T.accent,
    },
  ];
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .features-section { padding: 60px 20px !important; }
          .features-h2 { font-size: 30px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section className="features-section" style={{ padding: "80px 48px", background: T.bgDeep }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: "0.3em",
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            ★ 教室の3つの強み ★
          </div>
          <h2
            className="features-h2"
            style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.2, margin: 0 }}
          >
            ただ作るんじゃない。
            <br />
            「考える」を、楽しむ。
          </h2>
        </div>

        <div
          className="features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {items.map((f) => (
            <div
              key={f.num}
              style={{
                background: T.surface,
                padding: 32,
                borderRadius: 20,
                border: `1px solid ${f.color}30`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  fontSize: 80,
                  opacity: 0.15,
                }}
              >
                {f.emoji}
              </div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.emoji}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: f.color,
                  letterSpacing: "0.2em",
                  marginBottom: 8,
                }}
              >
                FEATURE {f.num}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 14px" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: T.textMute, margin: 0 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
