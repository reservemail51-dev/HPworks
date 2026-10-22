# HPworks（【仮：屋号】自社サイト）

SNSで集客する、全国の個人店向けホームページ制作サービスのサイトです。
方針は `docs/制作指示書.md`、Claude Code 向けのルールは `CLAUDE.md` にあります。

## フォルダの構成
- `public/` … サイト本体。Cloudflare ではこのフォルダだけを公開します。
- `public/samples/` … 架空店舗のサンプルサイト（制作実績の「サイトを見る」から開く。検索には出さない）
- `docs/` … 制作指示書・画像生成プロンプト・提案メモ（公開されません）
- `tools/` … シェア画像のひな形・スクリーンショットの道具（公開されません）
- `sns/` … Instagram 用の画像（プロフィール・ハイライトのカバー）と、アイコンの元画像（公開されません）

## いまの状態
- 全ページできています：トップ／サービス・料金／制作実績（一覧・詳細）／ご依頼の流れ／よくある質問／お問い合わせ／送信完了／無料デモの申し込み（かんたん質問シート）／質問シート送信完了／SNSプロフィール用のリンクページ（`links.html`）／404。
- 屋号・LINE・Instagram・メール・フォームの送信先などは【仮】のままです（`CLAUDE.md` の「【仮】の一括置き換え」を参照）。フォームは送信先が決まるまで「準備中」と表示して送信を止めています。
- フォームの設定は `docs/SSGform設定シート.md`、自動返信・LINE・InstagramのDMの文面は `docs/自動返信メッセージ.md`。

## 見てみる
`public/index.html` をブラウザで開けば、そのまま表示されます（Googleフォントはネットにつながっているときだけ反映）。

## 公開のしかた（Cloudflare）
Cloudflare のダッシュボードで「Workers & Pages」→「作成」→ GitHub のこのリポジトリを選び、ビルドコマンドなしで作成します。設定はリポジトリ直下の `wrangler.jsonc` が読み込まれ、`public/` だけが公開されます。

## 実績を追加するとき（Claude Code への頼み方の例）
> public/images/works/nail-xxx に画像を入れたので、「ネイルサロン〇〇」を自主制作サンプルとして実績に追加して。業種はネイルサロン、規模は1ページ、ポイントは「予約ボタンを上に」「メニューを写真で大きく」。トップにも出して。

## 画像を差し替えるとき
`public/images/` に同じファイル名で上書きするか、Claude Code に「public/images に〇〇.png を入れたので差し替えて（WebPに変換して）」と頼んでください。

## SNSに貼るURL
プロフィールのリンクには、大きなボタンが並んだ `links.html` を貼ります。どのSNSから来たかを分けて見られるよう、`?from=` を付けておくのがおすすめです。
- Instagram：`https://hpworks.hp-web.workers.dev/links.html?from=instagram`
- Threads：`https://hpworks.hp-web.workers.dev/links.html?from=threads`

## 実績のスクリーンショットをつくる（任意）
パソコンに Node.js を入れて、このフォルダで `npm i -D playwright` のあと、
`node tools/screenshot.mjs <id> <URL>` で `public/images/works/<id>/` に画像ができます。
シェア画像は `node tools/screenshot.mjs --ogp`（`tools/ogp.html` の文言を変えたとき）。
