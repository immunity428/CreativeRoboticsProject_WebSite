// src/sections/Teacher.tsx
import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";

import kake  from "../assets/teacher_kake.jpg";

const TEACHERS = [
  {
    name: "かけ",
    role: "webエンジニア / メイン講師",
    bio: "「明日を今日よりも少し良くするために活動しています。」",
    photo: kake,
    stats: [{ k: "年齢", v: "20" }, { k: "得意", v: "IoT・組込み" }, { k: "好物", v: "ソフトクリーム" }],
  },
];

export default function Teacher() {
  const { tokens: T } = useTheme();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % TEACHERS.length);
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const teacher = TEACHERS[current];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .teacher-section { padding: 60px 20px !important; }
          .teacher-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 28px !important; }
          .teacher-photo-wrap { width: 120px !important; height: 150px !important; }
          .teacher-stats { grid-template-columns: repeat(3, 1fr) !important; }
          .teacher-name { font-size: 22px !important; }
        }
      `}</style>
      <section className="teacher-section" style={{ padding: "80px 48px", background: T.bgGrad }}>
        <div
          style={{
            fontSize: 12,
            color: T.primary,
            letterSpacing: "0.3em",
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          ★ 講師紹介 ★
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 24px" }}>担当講師</h2>

        {/* 講師名ボタン */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {TEACHERS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setCurrent(i)}
              style={{
                padding: "7px 18px",
                borderRadius: 999,
                border: i === current ? `2px solid ${T.primary}` : `1px solid ${T.border}`,
                background: i === current ? T.primary : T.surface,
                color: i === current ? "#fff" : T.textMute,
                fontWeight: i === current ? 800 : 500,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* 講師カード */}
        <div
          className="teacher-card"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 48,
            alignItems: "center",
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 24,
            padding: "48px",
          }}
        >
          {/* 写真 */}
          <div style={{ position: "relative" }}>
            <div
              className="teacher-photo-wrap"
              style={{
                width: 160,
                height: 200,
                borderRadius: 20,
                border: `3px solid ${T.primary}`,
                overflow: "hidden",
              }}
            >
              <img
                src={teacher.photo}
                alt={teacher.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: -16,
                background: T.yellow,
                color: "#0e1a2b",
                padding: "8px 14px",
                borderRadius: 12,
                fontWeight: 900,
                fontSize: 12,
                transform: "rotate(-3deg)",
              }}
            >
              ⚙️ 大学生
            </div>
          </div>

          {/* テキスト情報 */}
          <div>
            <div className="teacher-name" style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>{teacher.name}</div>
            <div style={{ fontSize: 13, color: T.primary, fontWeight: 700, marginBottom: 20 }}>
              {teacher.role}
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.95, color: T.textMute, margin: "0 0 28px" }}>
              {teacher.bio}
            </p>
            <div
              className="teacher-stats"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
            >
              {teacher.stats.map(s => (
                <div
                  key={s.k}
                  style={{
                    padding: 16,
                    background: T.bgDeep,
                    borderRadius: 12,
                    border: `1px solid ${T.pillBorder}`,
                  }}
                >
                  <div style={{ fontSize: 10, color: T.primary, letterSpacing: "0.15em", marginBottom: 6 }}>
                    {s.k}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
