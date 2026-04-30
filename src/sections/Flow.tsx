// src/sections/Flow.tsx
import { useTheme } from "../theme/ThemeContext";

const placeholderStyle = (dark: boolean): React.CSSProperties => ({
  background: dark
    ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 8px, rgba(255,255,255,0.10) 8px 16px), #1d2233"
    : "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 8px, rgba(0,0,0,0.07) 8px 16px), #e9ecef",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: 11,
  color: dark ? "#cfd6e0" : "#444",
  textAlign: "center",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: 12,
});

export default function Flow() {
  const { tokens: T } = useTheme();
  const isDark = true; // 背景は常にダーク固定
  const steps = [
    { time: "1hour", title: "🚉 集合・オリエンテーション", body: "あいさつをして、今日のテーマや目標を確認します" },
    { time: "2hour", title: "🔍 課題説明・アイデア出し", body: "ロボットの課題を聞き、どんな動きをさせるか考えます" },
    { time: "3hour", title: "💻 制作・プログラミング", body: "ロボットを組み立て、プログラミングに挑戦します" },
    { time: "4hour", title: "🚄 走行テスト・調整", body: "実際に動かして、うまくいかない所を改良します" },
    { time: "5hour", title: "🎉 発表・ふりかえり", body: "工夫した点を発表し、学んだことを共有します" },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .flow-section { padding: 60px 20px !important; }
          .flow-h2 { font-size: 26px !important; }
          .flow-photos { grid-template-columns: 1fr 1fr !important; }
          .flow-timeline { flex-direction: column !important; padding: 0 !important; }
          .flow-timeline-line { display: none !important; }
          .flow-timeline-dashes { display: none !important; }
          .flow-steps-grid { display: flex !important; flex-direction: column !important; gap: 16px !important; }
          .flow-step { text-align: left !important; display: flex !important; align-items: flex-start !important; gap: 16px !important; }
          .flow-step-circle { flex-shrink: 0 !important; margin: 0 !important; }
          .flow-step-body { text-align: left !important; }
        }
      `}</style>
      <section className="flow-section" style={{ padding: "80px 48px" }}>
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: "0.3em",
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            ★ 1日の流れ ★
          </div>
          <h2 className="flow-h2" style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>
            プログラミングの冒険、出発進行！
          </h2>
        </div>

        <div
          className="flow-photos"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 56,
          }}
        >
          {[
            "授業風景①\n全体の様子",
            "授業風景②\nM5Stack作業",
            "授業風景③\n走らせる！",
            "授業風景④\nシェアタイム",
          ].map((label) => (
            <div
              key={label}
              style={{
                ...placeholderStyle(isDark),
                aspectRatio: "1/1",
                borderRadius: 14,
                whiteSpace: "pre-line",
              }}
            >
              [ {label} ]
            </div>
          ))}
        </div>

        {/* タイムライン */}
        <div style={{ position: "relative", padding: "32px 0" }}>
          <div
            className="flow-timeline-line"
            style={{
              position: "absolute",
              top: 56,
              left: 20,
              right: 20,
              height: 6,
              background: T.primaryStrong,
              borderRadius: 3,
            }}
          />
          <div
            className="flow-timeline-dashes"
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              right: 20,
              height: 4,
              backgroundImage: `repeating-linear-gradient(90deg, ${T.accent} 0 8px, transparent 8px 24px)`,
              borderRadius: 2,
            }}
          />
          <div
            className="flow-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              position: "relative",
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.time}
                className="flow-step"
                style={{ textAlign: "center", position: "relative", paddingTop: 16 }}
              >
                <div
                  className="flow-step-circle"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: T.accent,
                    margin: "0 auto 16px",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    color: "white",
                    border: `4px solid ${T.bg}`,
                    boxShadow: `0 0 0 3px ${T.accent}`,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flow-step-body">
                  <div
                    style={{
                      fontSize: 11,
                      color: T.primary,
                      fontWeight: 800,
                      marginBottom: 6,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {s.time}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: T.textMute, lineHeight: 1.6 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}