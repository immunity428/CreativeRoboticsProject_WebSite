// src/sections/Teacher.tsx
import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import teachersData from "../data/teachers.json";

// 画像は動的importできないため photoKey → 画像モジュールのマップを手動管理
// 新しい講師を追加したら、ここに import と PHOTO_MAP エントリを追加してください
import kake from "../assets/teacher_kake.jpg";

const PHOTO_MAP: Record<string, string> = {
  kake,
};

const TEACHERS = teachersData.teachers.map((t) => ({
  ...t,
  photo: PHOTO_MAP[t.photoKey] ?? "",
}));

export default function Teacher() {
  const { tokens: T } = useTheme();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (TEACHERS.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TEACHERS.length);
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
              {teacher.badge}
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
              {teacher.stats.map((s) => (
                <div
                  key={s.key}
                  style={{
                    padding: 16,
                    background: T.bgDeep,
                    borderRadius: 12,
                    border: `1px solid ${T.pillBorder}`,
                  }}
                >
                  <div style={{ fontSize: 10, color: T.primary, letterSpacing: "0.15em", marginBottom: 6 }}>
                    {s.key}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
