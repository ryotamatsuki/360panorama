# 戦国の湯築城を歩く

道後公園・湯築城跡を題材にした、戦国期イメージの360度ウォークスルー静的Webアプリです。Pannellumを使い、8地点の2:1 equirectangular panoramaをつないで、外堀、大手門、土塁、武家屋敷、見張り場、高台の眺望を歩く体験として構成しています。

本コンテンツは歴史的イメージ再現です。厳密な史実復元・考古学的復元を示すものではなく、教育・観光・展示用途を想定したプロトタイプです。

## ローカル確認方法

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

- `index.html` を直接ダブルクリックするのではなく、ローカルサーバー経由で確認してください。
- サーバー起動中のターミナルを閉じると表示できなくなります。
- GitHub Pages公開時はGitHubが静的ファイルを配信するため、Pythonサーバーは不要です。

## GitHub Pages公開方法

1. GitHubにリポジトリを作成する
2. このプロジェクト一式をpushする
3. GitHubリポジトリの Settings を開く
4. Pages を開く
5. Source を Deploy from a branch にする
6. Branch を main、folder を /root にする
7. Save を押す
8. 数十秒から数分後に以下の形式のURLで公開される

```text
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

## GitHub Pages向け注意事項

- CSS、JS、画像は相対パスで読み込んでください。
- 先頭スラッシュ付きの `/assets/...`、`/src/...`、`/vendor/...` はGitHub Pagesのプロジェクトページで壊れやすいため使わないでください。
- 現在の8地点版では、`assets/panos/` と `assets/thumbs/` はGit管理対象に含めます。
- `assets/reference/` は本番360パノラマではなく、作風・建築様式・人物配置・色調の参照画像です。
- 将来的に数百から数千枚のパノラマ画像に増える場合は、Git LFSまたは外部ストレージ管理を検討してください。
- PannellumをCDNで使う場合、GitHub Pagesでは通常動作しますが、制限ネットワークでは読み込めない可能性があります。

## Pannellumの読み込み

現在の `index.html` はPannellumをCDNから読み込んでいます。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
<script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
```

CDN利用のままGitHub Pagesで公開できます。オフライン配布や制限ネットワーク対応が必要になった場合だけ、`vendor/pannellum/` にPannellum本体を置いてローカル読み込みへ切り替えてください。

```text
vendor/pannellum/
  pannellum.css
  pannellum.js
```

ローカル配置後は `index.html` の読み込みを以下の相対パスへ差し替えます。

```html
<link rel="stylesheet" href="vendor/pannellum/pannellum.css">
<script src="vendor/pannellum/pannellum.js"></script>
```

## 画像と角度調整

Pannellum用画像の推奨条件は以下です。

- 形式: WebP、PNG、JPEG
- アスペクト比: 2:1
- 推奨サイズ: 4096 x 2048 または 2048 x 1024
- 投影形式: equirectangular panorama

本番パノラマ画像を差し替えた後は、画像内の進行方向や見せたい対象物に合わせて `src/tour-data.js` の `initialYaw`、`initialPitch`、各リンクの `yaw`、`pitch` を必ず再調整してください。

## ファイル構成

```text
yuzuki-sengoku-360/
  .gitignore
  .nojekyll
  index.html
  package.json
  README.md
  src/
    app.js
    style.css
    tour-data.js
  assets/
    panos/
    thumbs/
    reference/
  docs/
    historical-framing.md
    image-prompts.md
    route-design.md
```

`vendor/pannellum/` は、ローカルPannellumを使う場合のみ本体ファイルをGit管理対象に含めてください。現在はCDN利用のため、本体ファイルは不要です。
