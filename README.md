# 戦国の湯築城を歩く — 道後公園 時空360

道後公園・湯築城跡を題材にした、24地点の360度パノラマウォークスルー静的Webアプリです。Pannellumのtour機能を使い、前後のホットスポットや地点一覧からルート内を移動できます。

GitHub Pages: https://ryotamatsuki.github.io/360panorama/

> 本コンテンツは、道後公園・湯築城跡を題材とした歴史的イメージ再現です。厳密な史実復元・考古学的復元を示すものではなく、教育・観光・展示用途を想定した体験型プロトタイプです。

## 現在の構成

- 24地点（N001〜N024）のデータ駆動型ツアー
- Pannellumを`assets/pannellum/`から読み込む静的構成
- HTML / CSS / JavaScriptのみで動作し、ビルド工程は不要
- GitHub Pagesで公開可能
- 現在のパノラマ素材は、共通のプロトタイプWebPと地点別PNGが混在する移行段階

本アプリはGoogleストリートビューのような任意位置の連続移動ではなく、事前定義された24地点を接続する簡易ストリートビュー型ウォークスルーです。

## ローカル確認

プロジェクト直下でローカルサーバーを起動します。

```bash
python -m http.server 8000
```

Windowsでは以下でも起動できます。

```bash
py -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://127.0.0.1:8000/
```

`index.html`を直接ダブルクリックするのではなく、ローカルサーバー経由で確認してください。

## QA

JavaScriptの構文確認は以下で実行できます。

```bash
npm run check
```

Pull Requestと`main`へのpushでは、GitHub Actionsが以下を自動確認します。

- Pannellum本体、`src/tour-data.js`、`src/app.js`のJavaScript構文
- 必須静的ファイルの存在
- `index.html`からPannellumの公開用パスを参照していること
- ローカルHTTPサーバー経由でPannellum JS/CSSを取得できること
- `tour-data.js`から参照されるパノラマ画像・サムネイルの存在

## 操作

- ドラッグ: 360度パノラマを見回す
- 前方ホットスポット: 次地点へ進む
- 後方ホットスポット: 前地点へ戻る
- `ArrowUp` / `W` / `ArrowRight`: 次地点へ進む
- `ArrowDown` / `S` / `ArrowLeft`: 前地点へ戻る
- `Home`: N001へ戻る
- `End`: N024へ移動
- 地点一覧・ルートインジケータ: 任意地点へジャンプ

## リポジトリ運用

正本ブランチは`main`とします。

GitHub Pagesは以下に統一します。

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

`master`は旧運用ブランチです。GitHubのDefault branchとPages Sourceを`main`へ切り替えた後に削除します。

大容量の受け渡しZIPはGit管理しません。必要な配布物はGitHub Releases等を使用し、ルートディレクトリへZIPをコミットしない運用とします。

## ファイル構成

```text
360panorama/
  .github/
    workflows/
      validate.yml
  .nojekyll
  index.html
  package.json
  README.md
  src/
    app.js
    style.css
    tour-data.js
  assets/
    pannellum/
      pannellum.css
      pannellum.js
    panos/
    thumbs/
    reference/
  docs/
    requirements.md
    historical-framing.md
    image-prompts.md
    route-design.md
```

## 画像と角度調整

本番用の24枚へ完全移行する場合は、`src/tour-data.js`の各地点の`image` / `thumb`を差し替え、実画像の向きに合わせてhotSpotの角度を調整します。

- `yaw`: 現在地点でホットスポットを表示する左右方向
- `pitch`: 現在地点でホットスポットを表示する上下方向
- `targetYaw`: 移動先地点で最初に向く左右方向
- `targetPitch`: 移動先地点で最初に向く上下方向

詳しいルート設計は[`docs/route-design.md`](docs/route-design.md)、初期要件は[`docs/requirements.md`](docs/requirements.md)、歴史表現上の前提は[`docs/historical-framing.md`](docs/historical-framing.md)を参照してください。

## Pannellum

Pannellumは`assets/pannellum/`に固定しており、CDNに依存しません。GitHub Pagesで配信対象から除外される可能性のあるルート直下の`vendor/`を避け、通常の静的アセットとして配信する構成です。
