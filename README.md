# 戦国の湯築城を歩く

道後公園・湯築城跡を題材にした、24地点の360度パノラマウォークスルー静的Webアプリです。Pannellumのtour機能を使い、各地点の前後ホットスポットから隣接地点へ移動できます。

本アプリは、Googleストリートビューのように任意位置を自由移動するものではありません。事前定義された24地点の360度パノラマ画像を、前後のホットスポットで移動する簡易ストリートビュー型ウォークスルーです。

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

`index.html` を直接ダブルクリックするのではなく、ローカルサーバー経由で確認してください。

## 操作

- ドラッグ: 360度パノラマを見回す
- 前方ホットスポット: 次地点へ進む
- 後方ホットスポット: 前地点へ戻る
- `ArrowUp` / `W` / `ArrowRight`: 次地点へ進む
- `ArrowDown` / `S` / `ArrowLeft`: 前地点へ戻る
- `Home`: N001へ戻る
- `End`: N024へ移動
- 右側の地点一覧・ルートインジケータ: 任意地点へジャンプ

## ルート

```text
N001 外堀入口
↓
N002 堀端の小道
↓
N003 木橋手前
↓
N004 木橋上
↓
N005 大手門前
↓
N006 門番の脇
↓
N007 大手門内側
↓
N008 土塁沿い入口
↓
N009 土塁沿い前半
↓
N010 木柵沿い
↓
N011 堀を見下ろす地点
↓
N012 城内広場手前
↓
N013 城内広場
↓
N014 井戸前
↓
N015 物資置場
↓
N016 厩・馬留め
↓
N017 武家屋敷通り入口
↓
N018 屋敷門前
↓
N019 屋敷の庭
↓
N020 縁側
↓
N021 詰所前
↓
N022 見張り台
↓
N023 高台への坂
↓
N024 城内眺望
```

## Pannellum

Pannellumは `vendor/pannellum/` から相対パスで読み込みます。CDNに依存しないため、GitHub Pagesでも外部ネットワーク制限の影響を受けにくい構成です。

```text
vendor/pannellum/
  pannellum.css
  pannellum.js
```

## GitHub Pages公開

1. このプロジェクト一式をGitHubへpushする
2. リポジトリの Settings > Pages を開く
3. Source を `Deploy from a branch` にする
4. Branch を `main`、Folder を `/root` にする
5. Saveする

公開URLは以下の形式です。

```text
https://<user>.github.io/<repo>/
```

GitHub Pages向けの注意点:

- CSS、JS、画像、Pannellumはすべて相対パスで読み込んでいます。
- `/assets/...` や `/src/...` のような先頭スラッシュ付きパスは使わないでください。
- `.nojekyll` を残してください。
- 本番画像を増やす場合、画像サイズが大きくなりすぎるならGit LFSなどの運用を検討してください。

## 画像と角度調整

現在の24地点は、既存の8枚のプロトタイプパノラマ画像を複数地点で共有しています。本番用の24枚に差し替える場合は、`src/tour-data.js` の各地点の `image` / `thumb` を差し替えてください。

本番パノラマ画像を差し替えた後は、各地点の hotSpot の yaw / pitch / targetYaw / targetPitch を実際の画像に合わせて調整してください。

- `yaw`: 現在地点でホットスポットを表示する左右方向
- `pitch`: 現在地点でホットスポットを表示する上下方向
- `targetYaw`: 移動先地点で最初に向く左右方向
- `targetPitch`: 移動先地点で最初に向く上下方向

詳しい調整手順は [docs/route-design.md](docs/route-design.md) を参照してください。

## ファイル構成

```text
yuzuki-sengoku-360/
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
  vendor/
    pannellum/
      pannellum.css
      pannellum.js
```
