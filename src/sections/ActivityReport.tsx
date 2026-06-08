// src/sections/ActivityReport.tsx
// 活動報告ページ
// Supabase の reports テーブルからデータを取得して表示する。

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';
import { supabase } from '../lib/supabase'; // Supabase クライアント

// 型定義
// Supabase の reports テーブルの1行分の型。
// TypeScript はこの型を使って「間違ったプロパティ名」などをビルド時に検出してくれる。
type Report = {
  id: number;
  date: string; // 例: "2026.03.15"
  title: string;
  place: string;
  body: string;
  color: 'primary' | 'accent' | 'yellow'; // カードのアクセントカラー
  images: string[]; // 画像URLの配列
  instagram_url: string | null; // Instagram投稿URL（なければ null）
  sort_order: number; // 表示順（小さい数字が上に来る）
};

// カスタムフック: Instagram 埋め込みスクリプトの読み込み
// Instagram の埋め込みには公式スクリプト（embed.js）が必要。
// このフックは active=true になったとき1回だけスクリプトをロードする。
// 2回目以降は window.instgrm が存在するので process() を呼ぶだけでOK。
function useInstagramEmbed(active: boolean) {
  const loaded = useRef(false); // スクリプトを既にロード済みかどうかのフラグ

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const w = window as unknown as {
      instgrm?: { Embeds: { process(): void } };
    };

    if (w.instgrm) {
      // スクリプトは既にロード済み → 再処理だけ実行
      w.instgrm.Embeds.process();
      return;
    }

    if (loaded.current) return; // ロード中なら何もしない
    loaded.current = true;

    // <script> タグを動的に作成して body に追加する
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true; // 非同期で読み込む
    document.body.appendChild(s);
  }, [active]);
}

// 子コンポーネント: 画像グリッド
// 画像の枚数に応じて自動的に列数を変える。
function ImageGrid({
  images,
  accentColor,
}: {
  images: string[];
  accentColor: string;
}) {
  if (!images.length) return null; // 画像がなければ何も表示しない

  const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : 3;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`, // 列数を動的に設定
        gap: 8,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${accentColor}30`,
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1/1',
            overflow: 'hidden',
            background: '#0a1320',
            maxWidth: 540,
            margin: '0 auto',
          }}
        >
          <img
            src={src}
            alt={`写真 ${i + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  );
}

// 子コンポーネント: Instagram 埋め込み
// Instagram の公式埋め込み形式（blockquote）を使う。
// embed.js がロードされると自動的に iframe に変換される。
function InstagramEmbed({ url }: { url: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={url} // 埋め込む投稿のURL
        data-instgrm-version='14' // Instagram API のバージョン
        style={{ margin: 0, maxWidth: 540, width: '100%', border: 'none' }}
      />
    </div>
  );
}

// メインコンポーネント
export default function ActivityReport() {
  const { tokens: T } = useTheme(); // デザイントークン（色など）
  const { navigate } = usePage(); // ページ遷移関数

  // useState: コンポーネントが持つ状態（データ）を管理する
  // reports → Supabase から取得したレポートの配列（最初は空）
  // loading → データ取得中かどうかのフラグ（最初は true）
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect: コンポーネントが画面に表示されたタイミングで1回だけ実行される
  // 第2引数の [] は「依存配列」で、空なら最初の1回だけ実行される
  useEffect(() => {
    supabase
      .from('reports') // reports テーブルを対象にする
      .select('*') // 全カラムを取得
      .order('sort_order', { ascending: false }) // sort_order の降順で並べる
      .then(({ data, error }) => {
        if (error)
          console.error(error); // エラーはコンソールに出力
        else setReports(data ?? []); // データを state に保存（null なら空配列）
        setLoading(false); // ローディング完了
      });
  }, []); // [] = マウント時に1回だけ実行

  // Instagram 埋め込みが必要かどうかを判定
  const hasInstagram = reports.some((r) => r.instagram_url);
  useInstagramEmbed(hasInstagram);

  return (
    <>
      {/* レスポンシブ対応のスタイル（モバイル用） */}
      <style>{`
        @media (max-width: 768px) {
          .ar-section { padding: 48px 20px !important; }
          .ar-h1 { font-size: 32px !important; }
          .ar-card { grid-template-columns: 1fr !important; padding: 24px !important; }
          .ar-meta { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>

      <section
        className='ar-section'
        style={{ padding: '72px 48px', position: 'relative' }}
      >
        {/* 戻るボタン: navigate('home') でホームに戻る */}
        <button
          type='button'
          onClick={() => navigate('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            background: T.surface,
            color: T.textMute,
            border: `1px solid ${T.border}`,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 32,
          }}
        >
          ← トップへ戻る
        </button>

        {/* ページヘッダー */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: '0.3em',
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            ★ ACTIVITY REPORT ★
          </div>
          <h1
            className='ar-h1'
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            活動報告
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.85,
              color: T.textMute,
              maxWidth: 640,
              margin: 0,
            }}
          >
            これまでに開催したロボット創造教室の様子と、子どもたちの成長の記録。
          </p>
        </div>

        {/* ローディング表示: データ取得中は「読み込み中...」を表示 */}
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 48,
              color: T.textMute,
              fontSize: 14,
            }}
          >
            読み込み中...
          </div>
        )}

        {/* レポート一覧 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {reports.map((r, i) => {
            // color フィールドに応じてアクセントカラーを決定
            const accentColor =
              r.color === 'primary'
                ? T.primary
                : r.color === 'accent'
                  ? T.accent
                  : T.yellow;

            // メディア（画像 or Instagram）があるかどうか
            const hasMedia = r.images.length > 0 || !!r.instagram_url;

            return (
              <article
                key={r.id}
                className='ar-card'
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 32,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 20,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* カード左端の色ライン */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: accentColor,
                  }}
                />

                {/* 左カラム: 日付・参加人数 */}
                <div>
                  {/* REPORT 番号（新しい順に大きい番号） */}
                  <div
                    style={{
                      fontSize: 11,
                      color: accentColor,
                      letterSpacing: '0.2em',
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    REPORT {String(reports.length - i).padStart(2, '0')}
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}
                  >
                    {r.date}
                  </div>
                </div>

                {/* 右カラム: タイトル・本文・タグ・メディア */}
                <div>
                  <h2
                    style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}
                  >
                    {r.title}
                  </h2>
                  <div
                    className='ar-meta'
                    style={{
                      display: 'flex',
                      gap: 14,
                      fontSize: 12,
                      color: T.textMute,
                      marginBottom: 16,
                      alignItems: 'center',
                    }}
                  >
                    <span>📍 {r.place}</span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: T.textMute,
                      margin: '0 0 16px',
                    }}
                  >
                    {r.body}
                  </p>

                  {/* メディアエリア: 画像または Instagram がある場合のみ表示 */}
                  {hasMedia && (
                    <div
                      style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                      }}
                    >
                      {/* 区切り線 */}
                      <div
                        style={{ height: 1, background: `${accentColor}25` }}
                      />

                      {/* 画像グリッド */}
                      {r.images.length > 0 && (
                        <ImageGrid
                          images={r.images}
                          accentColor={accentColor}
                        />
                      )}

                      {/* Instagram 埋め込み */}
                      {r.instagram_url && (
                        <>
                          {/* 画像もある場合はラベルを表示 */}
                          {r.images.length > 0 && (
                            <div
                              style={{
                                fontSize: 11,
                                color: T.textMute,
                                letterSpacing: '0.15em',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                              }}
                            >
                              <span style={{ color: accentColor }}>▶</span>{' '}
                              INSTAGRAM
                            </div>
                          )}
                          <InstagramEmbed url={r.instagram_url} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* 下部CTA */}
        <div
          style={{
            marginTop: 64,
            padding: 32,
            background: T.bgDeep,
            borderRadius: 20,
            textAlign: 'center',
            border: `1px solid ${T.border}`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
            🚄 次回開催も準備中です
          </div>
          <p style={{ fontSize: 14, color: T.textMute, margin: '0 0 20px' }}>
            最新情報はトップページからご確認ください
          </p>
          <button
            type='button'
            onClick={() => navigate('home')}
            style={{
              background: T.accent,
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: `0 8px 20px -6px ${T.accent}99`,
            }}
          >
            トップへ戻る →
          </button>
        </div>
      </section>
    </>
  );
}
