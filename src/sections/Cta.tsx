// src/sections/Cta.tsx
//
// イベント申し込みセクション（CTA = Call To Action）
// Supabase の events テーブルから最新のイベント情報を取得して表示する。
// google_form_id が設定されていれば Google フォームを埋め込む。

import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import ShinkansenSVG from '../components/ShinkansenSVG';
import { supabase } from '../lib/supabase';

// events テーブルの1行分の型
type EventData = {
  id: number;
  date: string | null; // 開催日（未定なら null）
  date_label: string; // 表示用の日付ラベル（例: "2026/06/15"）
  day_of_week: string | null; // 曜日（例: "日"）
  place: string | null; // 会場名（未定なら null）
  place_label: string; // 表示用の会場ラベル
  capacity: number; // 定員
  age_range: string; // 対象年齢（例: "幼児〜小6"）
  status: string; // 状態（"coming_soon" | "open" | "closed"）
  google_form_id: string | null; // Google フォームの ID（未設定なら null）
};

export default function Cta() {
  const { tokens: T } = useTheme();

  // Supabase から取得したイベントデータを管理する state
  // null = まだ取得していない状態
  const [event, setEvent] = useState<EventData | null>(null);

  // マウント時に events テーブルの最新1件を取得する
  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('id', { ascending: false }) // id の降順 = 最新のものが先頭
      .limit(1) // 1件だけ取得
      .single() // 配列ではなくオブジェクトとして受け取る
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setEvent(data);
      });
  }, []); // [] = マウント時に1回だけ実行

  // google_form_id が設定されていれば埋め込みURLを生成する
  // ?? は「左辺が null または undefined のとき右辺を使う」演算子
  const formUrl = event?.google_form_id
    ? `https://docs.google.com/forms/d/e/${event.google_form_id}/viewform?embedded=true`
    : null;

  // バッジに表示する情報（Supabase のデータがまだなければデフォルト値を使う）
  const badges = [
    `📅 ${event?.date_label ?? '未定'}`,
    `📍 ${event?.place_label ?? '未定'}`,
    `👶 ${event?.age_range ?? '幼児〜小6'}`,
  ];

  return (
    <>
      {/* モバイル用レスポンシブスタイル */}
      <style>{`
        @media (max-width: 768px) {
          .cta-section { padding: 60px 20px !important; }
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-h2 { font-size: 36px !important; }
          .cta-badges { gap: 8px !important; }
          .cta-badge { font-size: 12px !important; padding: 6px 12px !important; }
        }
      `}</style>

      <section
        className='cta-section'
        style={{
          position: 'relative',
          padding: '80px 48px',
          overflow: 'hidden',
          background: T.ctaGrad,
        }}
      >
        {/* 背景のドットパターン */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${T.ctaDots} 1px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* アニメーション（新幹線）*/}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            opacity: 0.15,
          }}
        >
          <div style={{ animation: 'shinkansen-run 18s linear infinite' }}>
            <ShinkansenSVG width={160} color='white' accent={T.accent} />
          </div>
        </div>

        {/* メインコンテンツ: 左にコピー、右にフォーム */}
        <div
          className='cta-grid'
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* 左: キャッチコピーとバッジ */}
          <div style={{ color: 'white' }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.3em',
                color: T.yellow,
                fontWeight: 900,
                marginBottom: 16,
              }}
            >
              🎫 BOARDING NOW
            </div>
            <h2
              className='cta-h2'
              style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '0 0 20px',
              }}
            >
              参加無料！
              <br />
              <span style={{ color: T.yellow }}>初心者OK！</span>
            </h2>

            {/* 定員は Supabase の値を使う。まだ取得できていなければ 6 をデフォルトにする */}
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                opacity: 0.9,
                margin: '0 0 24px',
              }}
            >
              定員{event?.capacity ?? 6}名 / 定員超過の場合抽選 /
              申込み1分で完了
            </p>

            {/* バッジ一覧 */}
            <div
              className='cta-badges'
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 13,
                flexWrap: 'wrap',
              }}
            >
              {badges.map((t) => (
                <div
                  key={t}
                  className='cta-badge'
                  style={{
                    padding: '8px 14px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 999,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* 安心ポイントのリスト */}
            <div
              style={{
                marginTop: 32,
                fontSize: 13,
                opacity: 0.8,
                lineHeight: 2,
              }}
            >
              ✅ Googleフォームで安全に受け付けています
              <br />
              ✅ 送信後、メールで詳細をご連絡します
              <br />✅ キャンセルはいつでもOK
            </div>
          </div>

          {/* 右: Google フォーム埋め込み */}
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                fontSize: 14,
                fontWeight: 800,
                color: '#0e1a2b',
              }}
            >
              🚄 イベントに申し込む
            </div>

            {/* formUrl がある → フォームを埋め込む、ない → COMING SOON を表示 */}
            {formUrl ? (
              <iframe
                src={formUrl}
                width='100%'
                height='560'
                style={{ border: 0, display: 'block' }}
                title='イベント申し込みフォーム'
                sandbox='allow-scripts allow-forms allow-same-origin'
              >
                読み込んでいます…
              </iframe>
            ) : (
              <div
                style={{
                  padding: 32,
                  textAlign: 'center',
                  color: '#666',
                  minHeight: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 40 }}>📋</div>
                <div
                  style={{ fontWeight: 800, fontSize: 16, color: '#0e1a2b' }}
                >
                  COMING SOON
                </div>
                <div style={{ fontSize: 14 }}>
                  イベント申し込みフォームを現在準備中です。
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
