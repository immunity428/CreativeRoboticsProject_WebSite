// src/sections/Access.tsx
import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";

const VENUES = [
  {
    id: "komine",
    name: "コミン家",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.0!2d135.5!3d34.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQyJzAwLjAiTiAxMzXCsDMwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v0",
    rows: [
      ["場所", "コミン家（コミュニティスペース）"],
      ["住所", "大阪府大阪市〇〇区〇〇町1-2-3"],
      ["最寄り", "〇〇駅 徒歩5分"],
      ["開催日", "毎月第2土曜 14:00〜15:30"],
      ["定員", "各回6名（少人数制）"],
      ["参加費", "無料（教材費込み）"],
    ],
  },
  {
    id: "kita",
    name: "北会場",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.0!2d135.51!3d34.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQzJzEyLjAiTiAxMzXCsDMwJzM2LjAiRQ!5e0!3m2!1sja!2sjp!4v0",
    rows: [
      ["場所", "北コミュニティセンター"],
      ["住所", "大阪府大阪市北区〇〇町4-5-6"],
      ["最寄り", "△△駅 徒歩3分"],
      ["開催日", "毎月第4日曜 13:00〜14:30"],
      ["定員", "各回8名"],
      ["参加費", "無料（教材費込み）"],
    ],
  },
  {
    id: "minami",
    name: "南会場",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.0!2d135.49!3d34.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzQ4LjAiTiAxMzXCsDI5JzI0LjAiRQ!5e0!3m2!1sja!2sjp!4v0",
    rows: [
      ["場所", "南市民ホール B棟"],
      ["住所", "大阪府大阪市住之江区〇〇7-8-9"],
      ["最寄り", "□□駅 徒歩8分"],
      ["開催日", "隔週水曜 16:00〜17:30"],
      ["定員", "各回4名（超少人数）"],
      ["参加費", "無料（教材費込み）"],
    ],
  },
] as const;

type VenueId = (typeof VENUES)[number]["id"];

export default function Access() {
  const { tokens: T } = useTheme();
  const [current, setCurrent] = useState<VenueId>("komine");

  const venue = VENUES.find(v => v.id === current)!;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .access-section { padding: 0 20px 60px !important; }
          .access-grid { grid-template-columns: 1fr !important; }
          .access-map { aspect-ratio: 4/3 !important; }
          .access-h2 { font-size: 28px !important; }
        }
      `}</style>
      <section className="access-section" style={{ padding: "0 48px 80px" }}>
        {/* セクションヘッダ */}
        <div style={{ fontSize: 12, color: T.primary, letterSpacing: "0.3em", fontWeight: 800, marginBottom: 14 }}>
          ★ ACCESS ★
        </div>
        <h2 className="access-h2" style={{ fontSize: 36, fontWeight: 900, margin: "0 0 24px" }}>会場案内</h2>

        {/* 会場切り替えタブ */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {VENUES.map(v => {
            const isActive = v.id === current;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setCurrent(v.id)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: isActive ? `2px solid ${T.primary}` : `1px solid ${T.border}`,
                  background: isActive ? T.primary : T.surface,
                  color: isActive ? "#fff" : T.textMute,
                  fontWeight: isActive ? 800 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {v.name}
              </button>
            );
          })}
        </div>

        {/* マップ + 情報グリッド */}
        <div
          className="access-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* Google マップ */}
          <div
            className="access-map"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              aspectRatio: "4/3",
            }}
          >
            <iframe
              key={venue.id}
              src={venue.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${venue.name} の地図`}
            />
          </div>

          {/* 教室情報 */}
          <div
            style={{
              background: T.surface,
              padding: 28,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ fontSize: 12, color: T.primary, letterSpacing: "0.3em", fontWeight: 800, marginBottom: 14 }}>
              ★ ACCESS ★
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 20px" }}>{venue.name}</h3>
            <div style={{ fontSize: 14, lineHeight: 2.1, color: T.textMute2 }}>
              {venue.rows.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    gap: 12,
                    paddingBlock: 4,
                    borderBottom: `1px solid ${T.border}`,
                    flexWrap: "wrap",
                  }}
                >
                  <strong style={{ color: T.text, display: "inline-block", minWidth: 70 }}>{k}</strong>
                  <span style={{ flex: 1 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
