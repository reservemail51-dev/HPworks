# このリポジトリのルール（Claude Code向け）

SNS（Instagram など）で集客する、全国の個人店向けホームページ制作サービスの自社サイト。詳しい方針は `docs/制作指示書.md` を正とする。料金・流れ・FAQ・実績の仕組みは前回の「愛媛東予Works」（https://github.com/reservemail51-dev/ehime-toyoworks）を土台にしている。

## 技術
- 静的な HTML / CSS / JavaScript のみ。ビルドツール・フレームワーク禁止。日本語サイト。
- 共通CSSは `public/css/style.css`、共通JSは `public/js/main.js`。色・フォントは `:root` のトークンを使う（直書きしない）。
- ヘッダー・フッターは各ページにコピーで持つ。変更するときは全ページを一括で直す。
- 公開は GitHub → Cloudflare（Workers の静的アセット）。設定はリポジトリ直下の `wrangler.jsonc`。**公開されるのは `public/` フォルダだけ**。`docs/`・`tools/`・`sns/`・説明書はリポジトリ直下に置き、公開しない。
- 公開URLは【仮】で `https://hpworks.hp-web.workers.dev/`（Worker名 `hpworks`）。独自ドメインにしたら `grep -rn "hpworks.hp-web.workers.dev" public tools` で一括で書きかえる。
- スマホファースト。幅360pxで横スクロールが出ないこと。本文16px以上、ボタン高さ48px以上。InstagramやLINEのアプリ内ブラウザで開かれる前提（`100vh` を使わない、重い演出をしない）。
- 画像は WebP、`width`/`height`・日本語 `alt`・`loading="lazy"`（ファーストビューを除く）。
- 未確定の情報は【仮：〇〇】のまま残す。価格には `<!-- PRICE -->` コメントを付ける。
- 見出しは言葉の途中で折り返さないよう、必要に応じて `<span class="ib">` で区切る。

## 【仮】の一括置き換え
屋号・連絡先は、決まったら全ファイルで一括置換する（`grep -rn "【仮" public tools` で確認）。
- `【仮：屋号】`／`【仮：ハンドルネーム】`／`【仮：活動拠点（例：愛媛県）】`
- `https://lin.ee/【仮：LINE】`（LINE友だち追加URL）
- `【仮：Instagram】`（`https://www.instagram.com/〇〇/` と DM用 `https://ig.me/m/〇〇` の両方に使っている）
- `【仮：メール】`、`【仮：トークン】`（Cloudflare Web Analytics）
- 屋号が決まったら `node tools/screenshot.mjs --ogp` でシェア画像を、`tools/screenshot.mjs` で実績用の画面画像（今は旧屋号の帯が写っている）を撮り直す。

## デザイン
コンセプトは「店主さんのノートに書いた、ホームページの相談メモ」。方眼ノート・付箋・マスキングテープ・手描き風の線を“ところどころ”に。
- 色：生成り `--bg`／墨 `--ink`／れんが色 `--main`（ボタン）／付箋きいろ `--marker`／くすみ紺 `--sub`／ミント `--mint`（ごく少量）。緑はLINEボタンだけ。
- フォント：見出し M PLUS Rounded 1c、本文 BIZ UDPGothic、手書き Yomogi（短い言葉だけ）。
- イラストは `public/images/`（ChatGPTで生成。元のPNGとSNS用画像は `sns/`、プロンプトは `docs/画像生成プロンプト.md`）。

## デザイン・文章の禁止事項
紫〜青グラデーション／ガラス風／ネオン／光る球体・ブロブ／キラキラ、同じ形のアイコンカードの羅列、数字カウンター、絵文字アイコン、全部中央揃え、強い影と角丸の多用、全要素フェードイン、英語の飾り見出し、実在しないお客様の声や数字。
「想いをカタチに」「伴走」「寄り添う」「最適なソリューション」などの決まり文句、体言止め・ダッシュ・「！」の多用。

## 実績の追加手順
1. 画像を `public/images/works/<id>/` に入れる（`thumb.webp` 800px幅、`pc.webp`・`sp.webp` 1600px幅程度。トップのカードは `sp.webp` を使う）。
2. `public/data/works.js` の `window.WORKS` に1件追加する（書式はファイル先頭のコメント参照）。
3. `type` は受注＝`client`、架空の自主制作＝`sample`、デザイン案＝`design`。`sample` には自動で「架空のお店のサンプルです」が付く。`area` は「架空の店舗」。
4. トップに出したいものは `pickup: true`（最大3件表示）。実績が0件のときは、トップの「制作実績」セクションは自動で非表示。
5. `voice`（お客様の声）は実際にもらったものだけ。

## 補足
- `public/samples/<id>/` は前回から移した架空店舗のサンプルサイト（tomoshibi・kohaku・hiuchi・soyogi・shizuku・mizunowa）。各ページに noindex、`_headers` でも `/samples/*` を noindex。お店の中身（地名など）は架空の設定としてそのまま。
- 全ページの `</body>` 直前に Cloudflare Web Analytics のスクリプトをコメントで置いている（トークンが決まったら有効にする）。
- プライバシーポリシーのページは置かない。フォームの送信ボタンの上に利用目的の一文を置く。
