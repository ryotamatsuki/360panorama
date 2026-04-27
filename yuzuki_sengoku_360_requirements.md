# 要件定義書  
## プロジェクト名  
**戦国の湯築城を歩く — 道後公園 時空360**

---

## 1. 目的

本プロジェクトは、愛媛県松山市の道後公園・湯築城跡を題材に、戦国期の湯築城および武家屋敷の雰囲気を体験できる、ブラウザベースの360度ウォークスルーを制作するものである。

参考実装は以下のリポジトリとする。

- <https://github.com/petergpt/gpt-image-360-babylon-walkthrough>
- 公開viewer: <https://babylon360walk.surge.sh/viewer/>

ただし、本プロジェクトではバビロンではなく、**戦国期の伊予・湯築城跡** を題材とする。

目的は厳密な学術復元ではなく、以下を満たす **教育・観光・展示向けの没入型歴史体験プロトタイプ** を作ることである。

- 道後公園・湯築城跡を舞台にした歴史的雰囲気の体験
- 侍・足軽・武家屋敷・土塁・堀・門などの生活感ある可視化
- 360度パノラマ画像をノードとして接続するウォークスルー
- 静的HTML/CSS/JavaScriptで動作する軽量viewer
- 画像差し替えにより本番化できるデータ駆動型構成

---

## 2. 成果物

Codexは、以下の成果物を生成すること。

### 2.1 静的Webアプリ一式

`yuzuki-sengoku-360/` という新規ディレクトリを作成し、以下の構成で実装する。

~~~text
yuzuki-sengoku-360/
  index.html
  README.md
  package.json
  src/
    app.js
    tour-data.js
    style.css
  assets/
    panos/
      N01_outer_moat.webp
      N02_main_gate.webp
      N03_rampart_path.webp
      N04_inner_courtyard.webp
      N05_samurai_street.webp
      N06_residence_garden.webp
      N07_guard_post.webp
      N08_overlook.webp
    thumbs/
      N01_outer_moat.webp
      N02_main_gate.webp
      N03_rampart_path.webp
      N04_inner_courtyard.webp
      N05_samurai_street.webp
      N06_residence_garden.webp
      N07_guard_post.webp
      N08_overlook.webp
  docs/
    image-prompts.md
    historical-framing.md
    route-design.md
~~~

### 2.2 Viewer

Pannellumを使った360度viewerを実装する。

要件は以下。

- ブラウザで `index.html` を開くと動作する。
- 8地点のシーンを切り替えられる。
- 各シーンに移動用ホットスポットを表示する。
- 前後の地点へ移動できる。
- 現在地名、説明文、ルート番号を表示する。
- サイドバーまたは下部パネルで全地点一覧を表示する。
- 画像が未生成でも動作確認できるように、仮のプレースホルダー画像を生成または配置する。
- 画像は後から本物の2:1 WebPパノラマに差し替え可能とする。
- 外部ビルドツールなしでも動作する静的構成とする。

---

## 3. 対象ユーザー

想定ユーザーは以下。

- 道後公園・湯築城跡に関心のある一般来訪者
- 歴史学習を行う小中高生
- 観光・文化財・地域PR担当者
- 生成AIによる歴史体験コンテンツの試作担当者
- 展示・イベントでのデモ閲覧者

---

## 4. 表現方針

### 4.1 基本方針

本コンテンツは、**「史実に着想を得た体験型復元」** とする。

厳密な考古学的・建築史的復元ではなく、道後公園・湯築城跡を題材に、戦国期の城郭・武家屋敷・侍の暮らしを違和感なく体験できるようにする。

### 4.2 明示すべき注記

画面またはREADMEに以下の趣旨を明記する。

~~~text
本コンテンツは、道後公園・湯築城跡を題材とした歴史的イメージ再現です。
厳密な史実復元・考古学的復元を示すものではなく、教育・観光・展示用途を想定した体験型プロトタイプです。
~~~

### 4.3 避ける表現

以下は出さない。

- 近世城郭風の巨大天守
- 姫路城・大阪城のような大規模白亜天守
- 現代の道路、アスファルト、電柱、看板、自動車
- 現代服
- ファンタジー要素
- 西洋風の城
- 過度に豪華な御殿
- 不自然な漢字看板・英語看板
- 史実と無関係な魔法的表現

---

## 5. ルート設計

初期MVPは8地点とする。

~~~text
N01 外堀入口
  ↓
N02 大手門前
  ↓
N03 土塁沿いの通路
  ↓
N04 城内広場
  ↓
N05 武家屋敷前の通り
  ↓
N06 武家屋敷の庭と縁側
  ↓
N07 詰所・見張り場
  ↓
N08 高台から見た城内の眺望
~~~

---

## 6. シーン定義

`src/tour-data.js` に以下の情報を持たせる。

各ノードの必須項目：

~~~js
{
  id: "N01",
  title: "外堀入口",
  subtitle: "湯築城へ入る起点",
  image: "assets/panos/N01_outer_moat.webp",
  thumb: "assets/thumbs/N01_outer_moat.webp",
  description: "外堀と土塁を望みながら、城内へ向かう導入地点。",
  zone: "outer_castle",
  initialYaw: 0,
  initialPitch: 0,
  links: [
    {
      target: "N02",
      label: "大手門へ進む",
      yaw: 20,
      pitch: -5
    }
  ]
}
~~~

### 6.1 ノード一覧

#### N01 外堀入口

- 役割：導入
- 表示要素：堀、土塁、木橋または通路、遠くの門、侍・足軽
- 次地点：N02 大手門前

#### N02 大手門前

- 役割：城内へ入る緊張感
- 表示要素：木造門、門番、槍を持つ足軽、外堀方向の見返り
- 前地点：N01
- 次地点：N03

#### N03 土塁沿いの通路

- 役割：城郭空間の連続性
- 表示要素：土塁、木柵、堀、巡回する侍
- 前地点：N02
- 次地点：N04

#### N04 城内広場

- 役割：生活感と活動感
- 表示要素：井戸、馬、物資運搬、兵具、家人、武家屋敷群
- 前地点：N03
- 次地点：N05

#### N05 武家屋敷前の通り

- 役割：侍の居住空間
- 表示要素：屋敷門、低い塀、庭木、侍、家人、子ども
- 前地点：N04
- 次地点：N06

#### N06 武家屋敷の庭と縁側

- 役割：生活空間の内部体験
- 表示要素：縁側、庭石、井戸、槍立て、鎧、炊事の気配
- 前地点：N05
- 次地点：N07

#### N07 詰所・見張り場

- 役割：軍事的緊張感
- 表示要素：見張り台、旗、槍、弓、巡回兵、城内を見下ろす視点
- 前地点：N06
- 次地点：N08

#### N08 高台から見た城内の眺望

- 役割：締め
- 表示要素：土塁、堀、門、屋敷群、歩いてきたルートの俯瞰的雰囲気
- 前地点：N07

---

## 7. 画像要件

### 7.1 画像形式

最終画像は以下を想定する。

~~~text
形式：WebP
アスペクト比：2:1
推奨サイズ：4096 x 2048 または 2048 x 1024
用途：Pannellum用 equirectangular panorama
~~~

### 7.2 プレースホルダー

Codexは、実画像がなくてもviewerの動作確認ができるよう、簡易的な2:1 WebPまたはPNGプレースホルダーを8枚作成する。

プレースホルダーには以下を入れる。

- ノードID
- 地点名
- `Replace with 2:1 panorama`
- 方向確認用の簡易グリッドまたは方位目印

ただし、Pannellumで読める通常画像形式にすること。

---

## 8. 画像生成プロンプト管理

`docs/image-prompts.md` を作成し、各ノードの画像生成プロンプトを記載する。

共通条件：

~~~text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
The scene is a historically inspired immersive reconstruction of Yuzuki Castle in Iyo during the late Sengoku period.
Make the scene feel like one physical step in a connected route.
Show the previous location behind the viewer and the next location ahead where applicable.
Use shared landmarks across adjacent panoramas.
Keep the horizon centered.
Avoid modern objects, text, labels, signs, cars, electric poles, asphalt, modern clothing, fantasy architecture, and oversized early-modern castle towers.
~~~

---

## 9. UI要件

### 9.1 画面構成

画面は以下で構成する。

~~~text
------------------------------------------------
| Header: 戦国の湯築城を歩く                  |
------------------------------------------------
|                                              |
|              360 Viewer                      |
|                                              |
------------------------------------------------
| 現在地: N01 外堀入口                         |
| 説明文                                       |
| [戻る] [次へ] [地点一覧]                     |
------------------------------------------------
~~~

PCでは左または右にサイドパネルを表示してよい。  
スマートフォンでは下部パネルに折りたたむ。

### 9.2 必須UI

- タイトル
- 現在地名
- 現在地説明
- 前へボタン
- 次へボタン
- 地点一覧
- 注記表示
- ホットスポットラベル

### 9.3 任意UI

余力があれば以下も実装する。

- 簡易ミニマップ
- 進捗表示 `1 / 8`
- フルスクリーンボタン
- 自動回転ON/OFF
- 日本語/英語切替の土台

---

## 10. 操作要件

### 10.1 マウス・タッチ操作

- ドラッグで周囲を見回せる。
- ホイールまたはピンチでズームできる。
- ホットスポットクリックで次地点へ移動できる。

### 10.2 キーボード操作

最低限、以下に対応する。

~~~text
ArrowLeft  : 前の地点
ArrowRight : 次の地点
Home       : N01へ戻る
~~~

---

## 11. データ構造要件

### 11.1 tour-data.js

`src/tour-data.js` は以下のような形式で実装する。

~~~js
export const tour = {
  id: "yuzuki_sengoku_walk",
  title: "戦国の湯築城を歩く",
  subtitle: "道後公園 時空360",
  startNode: "N01",
  disclaimer:
    "本コンテンツは、道後公園・湯築城跡を題材とした歴史的イメージ再現です。厳密な史実復元・考古学的復元ではありません。",
  nodes: [
    // node objects
  ]
};
~~~

ビルド不要で動かすため、ES Modulesを使う場合はローカルサーバー起動をREADMEに明記する。  
より簡単にするなら、`window.YUZUKI_TOUR_DATA = {...}` 形式でもよい。

### 11.2 リンク定義

各ノードの `links` に移動先を定義する。

~~~js
links: [
  {
    target: "N02",
    label: "大手門へ進む",
    yaw: 20,
    pitch: -5
  }
]
~~~

yaw/pitchは後で画像に合わせて調整する前提でよい。  
初期値は仮配置でよい。

---

## 12. 実装要件

### 12.1 Pannellum初期化

`src/app.js` でPannellumを初期化する。

要件：

- 起動時に `startNode` を読み込む。
- シーン切替時に現在地情報を更新する。
- ホットスポットを動的生成する。
- 前へ/次へボタンも同じシーン切替関数を使う。
- 存在しないノードIDが指定された場合はエラー表示する。

擬似コード：

~~~js
let currentNodeId = tour.startNode;

function loadNode(nodeId) {
  const node = getNode(nodeId);
  currentNodeId = nodeId;

  viewer.loadScene(node.id, node.initialYaw, node.initialPitch);
  updateInfoPanel(node);
  updateNavigationButtons(node);
}
~~~

### 12.2 Pannellumシーン設定生成

tour-dataからPannellum用configを生成する。

~~~js
function buildPannellumConfig(tour) {
  const scenes = {};

  for (const node of tour.nodes) {
    scenes[node.id] = {
      title: node.title,
      type: "equirectangular",
      panorama: node.image,
      yaw: node.initialYaw || 0,
      pitch: node.initialPitch || 0,
      hotSpots: node.links.map(link => ({
        pitch: link.pitch,
        yaw: link.yaw,
        type: "scene",
        text: link.label,
        sceneId: link.target
      }))
    };
  }

  return {
    default: {
      firstScene: tour.startNode,
      sceneFadeDuration: 700,
      autoLoad: true
    },
    scenes
  };
}
~~~

---

## 13. デザイン要件

### 13.1 トーン

- 和風
- 落ち着いた歴史展示風
- 過度にゲーム的にしない
- 観光・博物館展示に転用できる見た目

### 13.2 色

推奨：

~~~text
背景：墨色、濃い茶、生成り
アクセント：金茶、朱、深緑
文字：白、生成り、黒
~~~

### 13.3 フォント

システムフォントでよい。

~~~css
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Hiragino Sans",
  "Yu Gothic",
  "Yu Gothic UI",
  sans-serif;
~~~

---

## 14. README要件

`README.md` には以下を記載する。

- プロジェクト概要
- 実行方法
- ファイル構成
- 画像差し替え方法
- 2:1パノラマ画像の要件
- Pannellumを使っていること
- 史実復元ではなく歴史的イメージ再現であること
- 今後の拡張案

実行方法は最低限以下を記載する。

~~~bash
cd yuzuki-sengoku-360
python -m http.server 8000
~~~

閲覧：

~~~text
http://localhost:8000
~~~

---

## 15. docs要件

### 15.1 docs/image-prompts.md

8地点分の画像生成プロンプトを記載する。

### 15.2 docs/route-design.md

以下を記載する。

- ルート全体図
- 各地点の役割
- 隣接地点との共有ランドマーク
- 将来拡張する場合の候補地点

### 15.3 docs/historical-framing.md

以下を記載する。

- 本コンテンツの歴史表現方針
- 湯築城跡を題材にする理由
- 「厳密復元」ではなく「体験型復元」であること
- 避けるべき表現

---

## 16. 受入条件

Codexの実装完了後、以下を満たすこと。

### 16.1 動作

- `python -m http.server 8000` で起動できる。
- ブラウザでトップページを開ける。
- 360 viewerが表示される。
- 8地点すべてに移動できる。
- ホットスポットをクリックして隣接地点へ移動できる。
- 前へ/次へボタンで移動できる。
- 地点一覧から任意地点へ移動できる。
- 現在地名と説明文が切り替わる。

### 16.2 データ

- 8ノードが定義されている。
- 各ノードに画像パス、説明文、リンクがある。
- 存在しないリンク先がない。
- 画像差し替え時にコード修正が最小限で済む。

### 16.3 表現

- 注記が表示されている。
- 「史実そのもの」と誤認させない。
- 巨大天守や現代物を前提とした説明になっていない。
- ルートが一本道として理解できる。

### 16.4 ファイル

- `README.md` がある。
- `docs/image-prompts.md` がある。
- `docs/route-design.md` がある。
- `docs/historical-framing.md` がある。
- プレースホルダー画像が8枚ある。

---

## 17. 実装優先順位

### Phase 1：MVP

最優先で以下を作る。

- 静的viewer
- 8地点データ
- ホットスポット移動
- 前へ/次へ移動
- 地点一覧
- プレースホルダー画像
- README

### Phase 2：見栄え改善

余力があれば以下を行う。

- ミニマップ
- 進捗表示
- モバイル最適化
- フルスクリーン対応
- 自動回転ボタン

### Phase 3：本番画像対応

将来対応として以下を想定する。

- GPT Image等で生成した2:1パノラマ画像に差し替え
- サムネイル自動生成
- WebP圧縮
- ルートを20地点程度に拡張
- 道後温泉・伊佐爾波神社方面との接続

---

## 18. Codexへの実装指示

以下を厳守して実装すること。

~~~text
You are implementing a static browser-based 360-degree walkthrough prototype.

Create a new directory named yuzuki-sengoku-360.

Build a lightweight static web app using HTML, CSS, and vanilla JavaScript.
Use Pannellum as the 360-degree equirectangular panorama viewer.
Do not use React, Next.js, or a backend server.
The app must run with python -m http.server 8000.

The subject is a historically inspired immersive reconstruction of Yuzuki Castle in Dogo Park, Matsuyama, Ehime, Japan, during the late Sengoku period.

This is not a strict archaeological reconstruction. It is an educational and tourism-oriented prototype.

Implement 8 connected panorama nodes:
N01 outer moat entrance
N02 main gate
N03 rampart path
N04 inner courtyard
N05 samurai residential street
N06 samurai residence garden and veranda
N07 guard post
N08 overlook

Each node must have:
- id
- title
- subtitle
- image path
- thumbnail path
- description
- zone
- initial yaw
- initial pitch
- links to adjacent nodes with yaw and pitch

Create placeholder 2:1 panorama images for all 8 nodes so the viewer can be tested before final AI-generated panorama images are added.

Implement:
- Pannellum viewer
- scene switching
- movement hotspots
- previous and next buttons
- node list
- current location panel
- disclaimer
- responsive layout

Create:
- README.md
- docs/image-prompts.md
- docs/route-design.md
- docs/historical-framing.md

Keep the code simple, readable, and data-driven.
Avoid hardcoding scene logic outside the tour data structure.
~~~

---

## 19. 最終的な完成イメージ

完成物は、現時点では本物のAI生成パノラマ画像がなくても、以下の状態になっていればよい。

- ローカルで開ける
- 8地点を歩ける
- 画像差し替えだけで本番化できる
- 湯築城跡・武家屋敷・侍の暮らしという企画意図が伝わる
- 観光・教育向けのプロトタイプとして説明可能

特に重要なのは、**画像そのものより先に、ルート構造とviewer構造を固めること**である。
