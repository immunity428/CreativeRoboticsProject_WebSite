// src/sections/ActivityReport.tsx
import { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';

/* =========================================================
   投稿データ
   - kind: "text"       … テキスト投稿
   - kind: "instagram"  … Instagram 埋め込み（permalink を渡す）
   - kind: "feature"    … メディア掲載 / リンク付き投稿
   ========================================================= */
type Post =
  | {
      kind: 'text';
      id: string;
      date: string; // 表示用（例: "2026年3月16日"）
      relative: string; // 相対表示（例: "1か月前"）
      body: string;
      tags?: string[];
    }
  | {
      kind: 'instagram';
      id: string;
      date: string;
      relative: string;
      caption?: string;
      permalink: string; // 例: https://www.instagram.com/p/XXXXX/
    }
  | {
      kind: 'feature';
      id: string;
      date: string;
      relative: string;
      body: string;
      link: { label: string; url: string; site?: string };
      tags?: string[];
    };

const POSTS: Post[] = [
  {
    kind: 'text',
    id: 'p-7',
    date: '2026年4月20日',
    relative: '1週間前',
    body: '次回のロボット創造教室、ただいま準備中です🚄 今回は『障害物を避けて走る』にチャレンジ。日程が決まり次第トップページとインスタでお知らせします！',
    tags: ['#次回開催', '#プラレール改造', '#M5Stack'],
  },
  {
    kind: 'feature',
    id: 'p-6',
    date: '2026年4月5日',
    relative: '3週間前',
    body: '茅野市の地域情報サイト『ちのナビ』様にて、当教室の活動を紹介していただきました！取材ありがとうございました🙇‍♂️',
    link: {
      label: '子どもたちが目を輝かせる「ロボット創造教室」とは',
      url: 'https://example.com/chino-navi/article/robot-lab',
      site: 'ちのナビ',
    },
    tags: ['#メディア掲載', '#茅野市'],
  },
  {
    kind: 'instagram',
    id: 'p-5',
    date: '2026年3月16日',
    relative: '1か月前',
    caption:
      '第3回 ロボット創造教室、無事終了！ 6名の小さなエンジニアたちが、自分のロボット列車を完成させました🚄✨',
    // ※ 実際の投稿 URL に差し替えてください
    permalink: 'https://www.instagram.com/p/CXXXXXXXXXX/',
  },
  {
    kind: 'text',
    id: 'p-4',
    date: '2026年3月10日',
    relative: '1か月前',
    body: '今週末は第3回 ロボット創造教室を開催します！会場は公立諏訪東京理科大学。学生サポーターも準備万端です💪',
    tags: ['#開催直前', '#諏訪東京理科大学'],
  },
  {
    kind: 'feature',
    id: 'p-3',
    date: '2026年2月12日',
    relative: '2か月前',
    body: '長野日報様の WEB 版に、第2回開催の様子を取り上げていただきました。子どもたちの『なぜ?』が止まらない様子をぜひご覧ください。',
    link: {
      label: 'プラレールでプログラミング 茅野で小学生向け教室',
      url: 'https://example.com/nagano-nippo/article/2026-02',
      site: '長野日報',
    },
    tags: ['#メディア掲載'],
  },
  {
    kind: 'instagram',
    id: 'p-2',
    date: '2026年1月21日',
    relative: '3か月前',
    caption:
      '第2回 ロボット創造教室、コミン家にて開催！『センサーで止まる電車』に挑戦しました🚦',
    permalink: 'https://www.instagram.com/p/CYYYYYYYYYY/',
  },
  {
    kind: 'text',
    id: 'p-1',
    date: '2025年11月10日',
    relative: '5か月前',
    body: '本日、第1回 ロボット創造教室を開催しました🎉 4名の子どもたちが参加してくれて、全員がプラレールを M5Stack で動かすことに成功！『動いた!』の歓声が今でも耳に残っています。',
    tags: ['#初回開催', '#感謝'],
  },
];

/* =========================================================
   Instagram 埋め込みコンポーネント
   - <blockquote class="instagram-media"> を使い、
     embed.js を 1度だけロード → process() で再描画
   ========================================================= */
function InstagramEmbed({ permalink }: { permalink: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SCRIPT_ID = 'instagram-embed-js';
    const renderEmbed = () => {
      // @ts-ignore
      if (window.instgrm?.Embeds?.process) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      }
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script');
      s.id = SCRIPT_ID;
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.onload = renderEmbed;
      document.body.appendChild(s);
    } else {
      renderEmbed();
    }
  }, [permalink]);

  return (
    <div ref={ref} style={{ marginTop: 12 }}>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={permalink}
        data-instgrm-version='14'
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 12,
          margin: 0,
          maxWidth: 540,
          width: '100%',
        }}
      >
        <a href={permalink} target='_blank' rel='noopener noreferrer'>
          Instagram で見る
        </a>
      </blockquote>
    </div>
  );
}

/* =========================================================
   投稿カード（ツイート風）
   ========================================================= */
function PostCard({ post }: { post: Post }) {
  const { tokens: T } = useTheme();

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: 14,
        padding: '20px 20px',
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
      }}
    >
      {/* アバター */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${T.primaryStrong}, ${T.primaryGradTo})`,
          display: 'grid',
          placeItems: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        🚄
      </div>

      {/* 本文側 */}
      <div style={{ minWidth: 0 }}>
        {/* ヘッダ：名前 + ハンドル + 日時 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 6,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 14 }}>
            ロボット創造教室
          </span>
          <span style={{ fontSize: 12, color: T.primary, fontWeight: 700 }}>
            ✓
          </span>
          <span style={{ fontSize: 13, color: T.textMute }}>
            @robot_creative_lab
          </span>
          <span style={{ fontSize: 13, color: T.textMute }}>·</span>
          <span style={{ fontSize: 13, color: T.textMute }} title={post.date}>
            {post.relative}
          </span>
        </div>

        {/* 本文 */}
        {post.kind === 'text' && (
          <>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                margin: '0 0 10px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {post.body}
            </p>
            {post.tags && <TagRow tags={post.tags} />}
          </>
        )}

        {post.kind === 'feature' && (
          <>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                margin: '0 0 12px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {post.body}
            </p>
            <LinkPreview link={post.link} />
            {post.tags && <TagRow tags={post.tags} />}
          </>
        )}

        {post.kind === 'instagram' && (
          <>
            {post.caption && (
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  margin: '0 0 8px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {post.caption}
              </p>
            )}
            <InstagramEmbed permalink={post.permalink} />
            <a
              href={post.permalink}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 8,
                fontSize: 12,
                color: T.primary,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              📷 Instagram で開く →
            </a>
          </>
        )}

        {/* フッタ：アクションっぽいアイコン（装飾） */}
        <div
          style={{
            display: 'flex',
            gap: 28,
            marginTop: 14,
            color: T.textMute,
            fontSize: 12,
          }}
        >
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            💬 —
          </span>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            🔁 —
          </span>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            ♡ —
          </span>
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {post.date}
          </span>
        </div>
      </div>
    </article>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  const { tokens: T } = useTheme();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            fontSize: 12,
            color: T.primary,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function LinkPreview({
  link,
}: {
  link: { label: string; url: string; site?: string };
}) {
  const { tokens: T } = useTheme();
  let host = link.site;
  try {
    if (!host) host = new URL(link.url).hostname.replace(/^www\./, '');
  } catch {
    host = link.url;
  }
  return (
    <a
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      style={{
        display: 'block',
        marginTop: 4,
        marginBottom: 12,
        padding: 14,
        borderRadius: 12,
        border: `1px solid ${T.border}`,
        background: T.bgDeep,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: T.textMute,
          marginBottom: 4,
          letterSpacing: '0.04em',
        }}
      >
        🔗 {host}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          lineHeight: 1.4,
          color: T.text,
        }}
      >
        {link.label}
      </div>
    </a>
  );
}

/* =========================================================
   メイン: 活動報告ページ（タイムライン形式）
   ========================================================= */
export default function ActivityReport() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .ar-section { padding: 32px 16px 60px !important; }
          .ar-h1 { font-size: 30px !important; }
          .ar-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ar-side { position: static !important; }
        }
      `}</style>
      <section
        className='ar-section'
        style={{ padding: '48px 48px 80px', maxWidth: 1100, margin: '0 auto' }}
      >
        {/* 戻るボタン */}
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
            marginBottom: 28,
          }}
        >
          ← トップへ戻る
        </button>

        {/* ヘッダ */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: '0.3em',
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            ★ ACTIVITY TIMELINE ★
          </div>
          <h1
            className='ar-h1'
            style={{
              fontSize: 44,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}
          >
            活動報告
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: T.textMute,
              margin: 0,
            }}
          >
            開催レポート・メディア掲載・お知らせをタイムライン形式でまとめています。
          </p>
        </div>

        {/* 本体：タイムライン + サイド */}
        <div
          className='ar-layout'
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 280px',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* メイン：投稿一覧 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              minWidth: 0,
            }}
          >
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* サイド：プロフィール / フォローCTA */}
          <aside
            className='ar-side'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'sticky',
              top: 24,
            }}
          >
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${T.primaryStrong}, ${T.primaryGradTo})`,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 26,
                  marginBottom: 12,
                }}
              >
                🚄
              </div>
              <div style={{ fontSize: 15, fontWeight: 900 }}>
                ロボット創造教室
              </div>
              <div
                style={{ fontSize: 12, color: T.textMute, marginBottom: 12 }}
              >
                @robot_creative_lab
              </div>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: T.textMute,
                  margin: '0 0 14px',
                }}
              >
                プラレール × M5Stack
                で「考える」を楽しむ、小学生向けプログラミング教室。長野県茅野市で開催中。
              </p>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: T.accent,
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  marginBottom: 8,
                }}
              >
                📷 Instagram をフォロー
              </a>
              <button
                type='button'
                onClick={() => navigate('home')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: T.text,
                  border: `1px solid ${T.border}`,
                  padding: '10px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                次回開催に申し込む
              </button>
            </div>

            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 12 }}>
                トレンド
              </div>
              {[
                { tag: '#プラレール改造', count: '3 件の投稿' },
                { tag: '#M5Stack', count: '3 件の投稿' },
                { tag: '#メディア掲載', count: '2 件の投稿' },
                { tag: '#茅野市', count: '1 件の投稿' },
              ].map((t) => (
                <div
                  key={t.tag}
                  style={{
                    paddingBlock: 8,
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{ fontSize: 13, fontWeight: 800, color: T.primary }}
                  >
                    {t.tag}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMute }}>
                    {t.count}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
